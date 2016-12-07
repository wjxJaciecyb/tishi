var app=angular.module("reminder",[]);
app.directive("myDiv",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:'<div id="reminders"><div ng-transclude><div></div>',
		link:function($scope,el){
			$(el).on("click",".view",function(){
				$(".view").removeClass("active");
					$(this).addClass("active");
						var self=this;
						$scope.$apply(function(){
						$scope.cu=$(self).index();
					})
				});					
			$(document).on("keyup",function(e){
				if(e.keyCode===13){
					var index=$(".active").index();
					if(index!==-1){
						$scope.$apply(function(){
							$scope.list.splice(index,1);
							$scope.savelocal();
						})
					}
					
				}
			});	
			
		}
	}
}]);


app.directive("myButton",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:'<div class="xuan"><div ng-transclude></div></div>',
		link:function($scope,el){
			$("#new").on("click",false);
			$(document).on("keyup",":input",false);
			$(el).on('click',function(){
				$(this).css("cursor","pointer");
				$("#chu").toggle();
				return false;
			});
			$("#chu").on("click",false);
			$(document).on("click",function(){
				$("#chu").hide();
			})
		}
	}
}]);
		app.controller("reminderCtrl",["$scope",function($scope){
		$scope.	list=[
//			{id:1002,name:"买书列表",theme:"red"},
//			{id:1001,name:"买表列表",theme:"yellow"},
//			{id:1004,name:"衣服列表",theme:"blue"}
		];
		function maxId(){
			var max=-Infinity;
			for(var i=0;i<$scope.list.length;i++){
				var v=$scope.list[i];
				if(v.id>max){
					max=v.id;
				}
			}
			return (max===-Infinity)?1000:max;
		}
		maxId();
		$scope.colors=["red","yellow","blue","brown","pink","purple","green"];
		
		$scope.addlist=function(){
			var len=$scope.list.length;
			var index=len%7;
			var v={
				id:maxId()+1,
				name:"新列表"+(len+1),
				theme:$scope.colors[index],
				todos:[]
			}
			$scope.list.push(v);
		}
		if(localStorage.reminder){
			$scope.list=JSON.parse(localStorage.reminder);
			console.table($scope.list)
		}else{
			$scope.list=[
//				{
	//				id:1003,
	//				name:'买书列表',
	//				theme:'blue',
	//				todos:[
	//					{name:'买书你本',state:1},
	//					{name:'没写呢你',state:1},
	//					{name:'的卡夫卡',state:0},
	//				]
	//			}
			
			];
		}
		$scope.savelocal=function(){
			localStorage.reminder=JSON.stringify($scope.list);
		}
		$scope.cu=0;
		
		
		//点击取消和完成
		$scope.cancel=function(){
			$("#chu").hide();
		}
		
		//点击删除
		$scope.del=function(){
		$scope.list.splice($scope.cu,1)
	}
	
	
	
	
	
//	//计算数量
	$scope.count=function(){
		var r=0;
		$scope.list[$scope.cu].todos.forEach(function(v,i){
			if(v.state===1){
				r++;
			}
		});
		return r;
	}
	
	$scope.count1=function(){
		var r=0;
		$scope.list[$scope.cu].todos.forEach(function(v,i){
			if(v.state===0){
				r++;
			}
		});
		return r;
	}
	
	
	//	清除已完成
	
	$scope.clear=function(){
		var newarr = [];
		$scope.list[$scope.cu].todos.forEach(function(v,i){
			if(v.state===0){
				newarr.push(v);
			}
		});
		$scope.list[$scope.cu].todos=newarr;
	}
	
	//内容中点击添加颜色
	$(".yi .all").on("click",function(){
		$(this).addClass("active");
		
	})
	
}])
