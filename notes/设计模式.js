/*
	策略模式
	https://juejin.cn/post/6844904138707337229
*/

// 维护权限列表
const jobList = ['FE','BE'];

// 策略
const strategies = {
	checkRole: function (value){
		return value ==='juejin'
	},
	checkGrade: function(value){
		return value>=1
	},
	checkJob:function(value){
		return jobList.indexOf(value)>1
	},
	checkEatType:function(value){
		return value ==='eat melons'
	}
}

// 校验规则
const Validator = function(){
	this.cache = [];

	// 添加策略事件
	this.add = function(value,method){
		this.cache.push(function(){
			return strategies[method](value);
		})
	}

	// 检查
	this.check = function(){
		for(let i = 0;i<this.cache.length;i++){
			const fn = this.cache[i];
			const status = fn(); // 开始检查
			if(!status){
				return false;
			}

		}
		return true
	}
}