// 节流
function throttle(func,time){
	
	let prevent = 0;
	return function (){
		let now = +new Date();
		context = this;
		args = arguments;
		if(now-prevent>time){
			func.apply(context,args)
			prevent = now;
		}
		
	}

}

// 防抖
function debounce(func,time,immediate){
    let timer = null;
    return function(){
        let context = this;
        let args = arguments
        if(timer){
            clearTimeout(timer)
        }
        if(immediate){
            let callNow = !timer;
            timer = setTimeout(function(){
                timer = null;
            },time);
            if(callNow) func.apply(context,argsÏ)
        }else{

        timer = setTimeout(function(){
            func.apply(context,args)
        },time)
        }
       

    }
}


// curry化
function curry(func){
	let args = [].prototype.slice.call(arguments,1);
	return function(){
		return func.apply(this, [...args,...arguments])
	}
}

var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (arg) => judge(...args, arg)

// 深克隆
var deepClone = obj=>{
	if(typeof obj !== 'object'||obj===null) return;
	let newObj = obj instanceof Array?[]:{};
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = typeof obj[key]==='object'?deepClone(obj[key]):obj[key];
		}
	}
	return newObj
}


// apply
Function.prototype.myApply = function (context, args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

// call
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

// bind 
Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
}

// instanceOf
function instanceOf(left, right) {
  let proto = left._proto_;
  let prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) {
      return true;
    }
    proto = proto._proto_;
  }
}

