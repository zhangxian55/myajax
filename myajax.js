(function(){
	//向外暴露
	var myajax = window.myajax = new Object();
	//版本号
	myajax.version = "1.0.0";
	//作者
	myajax.author = "xian";
	//GET函数，GET函数有多种用法，所以习惯不写传入的参数
	myajax.get = function(){
		//根据实参个数来决定URL、JSON、callback分别是谁：
		if(arguments.length == 2){
			var URL = arguments[0];
			var callback = arguments[1];
			//用户没有传入JSON，所以我们写一个空对象
			var JSON = undefined;
		}else if(arguments.length == 3){
			var URL = arguments[0];
			var JSON = arguments[1];
			var callback = arguments[2];
		}

		if(window.XMLHttpRequest){
			var xhr = new XMLHttpRequest();
		}else{
			var xhr = new ActiveXObject("Microsoft.XMLHttp");
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					//通过回调函数，向上层反馈responseText
					callback(xhr.responseText);
				}
			}
		}
		//查询字符串，如果JSON是undefined就直接等于""，否则就是一个IIFE的结果
		var queryString = JSON == undefined ? "" : (function(){
			var arr = [];
			for(var k in JSON){
				arr.push(k + "=" + JSON[k]);
			}
			return arr.join("&");
		})();

		xhr.open("GET",URL + "?" + queryString,true);
		xhr.send(null);
	}


	//GET函数，GET函数有多种用法，所以习惯不写传入的参数
	myajax.post = function(){
		//根据实参个数来决定URL、JSON、callback分别是谁：
		if(arguments.length == 2){
			var URL = arguments[0];
			var callback = arguments[1];
			//用户没有传入JSON，所以我们写一个空对象
			var JSON = undefined;
		}else if(arguments.length == 3){
			var URL = arguments[0];
			var JSON = arguments[1];
			var callback = arguments[2];
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					//通过回调函数，向上层反馈responseText
					callback(xhr.responseText);
				}
			}
		}
		//查询字符串，如果JSON是undefined就直接等于""，否则就是一个IIFE的结果
		var queryString = JSON == undefined ? "" : (function(){
			var arr = [];
			for(var k in JSON){
				arr.push(k + "=" + JSON[k]);
			}
			return arr.join("&");
		})();

		xhr.open("POST",URL,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(queryString);
	}
})();