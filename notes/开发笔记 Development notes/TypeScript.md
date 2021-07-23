# TypeScript

### typeScript中的数据类型

> typeScript中为了使编写的代码更规范,更有利于维护,增加了类型校验,在typeScript中主要给我们提供了以下数据类型  

1. 布尔类型(boolean)
2. 数字类型(number)
3. 字符串类型(string)
4. 数组类型(array)
5. 元组类型(tuple)
6. 枚举类型(enum)
7. 任意类型(any)
8. null和undefind
9. void类型
10. never类型

##### 1.布尔类型(boolean)

```typescript
var flag:boolean = true
```

##### 2.数组类型(number)

```typescript
var num:number = 123;
```

##### 3.字符串类型(string)

```typescript
var str:string = "hellow word";
```

##### 4.数组类型(array)

```typescript
//第一种方式
var arr1:number[] = [11,22,33];
var arr2:string[] = ["11","22","33"];

//第二种方式
var arr1:Array<number> = [11,22,33];
var arr2:Array<string> = ["11","22","33"];

//第三种方式
var arr:any[] = ["11",22,true];
```

##### 5.元组类型(tuple)   

```typescript
//属于数组的一种
var arr:[number,string] = [123,'123'];
var arr1:[number,string,blooean] = [123,'123',true];
```

##### 6.枚举类型(enum)

> ​	随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，这种方法称为枚举方法，用这种方法定义的类型称枚举类型。

```typescript
/*
enum 枚举名{
    标识符[=整型常数],
    标识符[=整型常数],
    ...
    标识符[=整型常数],
};
*/
enum Flag {success=1,error=2};
var f:Flag = Flag.error;  //f=2

enum Color {blue,red,'orange'};
var c:Color = color.red; // c=1   如果标识符没有赋值,他的值就是下标

enum Color {blue,red=3,'orange'};
var c:Color = color.orange;  // c=4

```

##### 7.任意类型(any)

```typescript
var num:any = 123;
num='123';
num=true;
//任意类型的用处
var domNode:any = document.getElementById(elementID);
domNode.style.color='red';
```

##### 8.null和undefined   

```typescript
//其他(never类型)数据类型的子类
var number:number;
console.log(number) //undefined   报错
var number:undefined;
console.log(number) //undefined   正确
//一个元素可能是 number类型 可能是null 可能是undefined
var number:number | undefind | null;
console.log(number) //undefined   正确
//null同上
```

##### 9.void类型

> typeScript中的void表示没有任何类型,一般用于定义方法的时候方法没有返回值.

```typescript
//es5
function fun1(){
    console.log('ES5')
}
fun1();

//正确写法
function fun2:void(){
    console.log('typeScript')
}
fun2();

function fun3:number(){
   return 123
}
fun3();
```

##### 10.never类型

> 是其他类型(包括null和undefined)的子类型,表示不会出现的值.
>
> 这意味着声明never的变量只能被never类型所赋值.

```typescript
var a:undefined;
a=undefined;

var b:null;
b=null;

var a:never;
a=(()=>{
  throw new Error('错误');
})()
```

### typeScript中的函数

##### 1.函数的定义

```typescript
//Es5中定义函数的方法
/*
函数声明法
function fun1(){
	return 'fun1'
}
匿名函数
var fun2 = function(){
    return 'fun2'
}
*/

//ts中定义函数的方法
/*
函数声明法
function fun1():string{
	return 'fun1'
}
匿名函数
var fun2 = function():number{
    return 123
}
*/

//ts中定义方法传参
/*
function fun3(name:string,age:number):string{
    return `我的名字是:${name},我今年${age}岁`
}
fun3('张三',20);  // 我的名字是:张三,我今年20岁
*/

//没有返回值的方法
/*
function fun4():void{
    console.log('fun4')
}
fun4()
*/
```

##### 2.方法可选参数

```typescript
//ES5里方法的形参和实参可以不一样,但是在ts中必须一样,如果不一样就需要配置可选参数
// 可选参数必须配置到参数后面
function fun(name:string,age?:number):string{
    if(age){
       return `我的名字是:${name},我今年${age}岁`
    }else{
         return `我的名字是:${name}`
    }
}
fun('张三',20)  //我的名字是:张三,我今年20岁
fun('张三')  //我的名字是:张三
```

##### 3.默认参数 可选参数

```typescript
//ES5中无法设置默认参数,ES6和ts中可以设置
function fun(name:string,age:number=18):string{
    if(age){
       return `我的名字是:${name},我今年${age}岁`
    }else{
         return `我的名字是:${name}`
    }
}
fun('张三',20)  //我的名字是:张三,我今年20岁
fun('张三')  //我的名字是:张三,我今年18岁
```

##### 4.剩余函数

```typescript
function fun1(a:number,b:number,C:number,d:number):number{
    return a+b+c+d
}
 fun1(1,2,3,4)  //10
//三点运算符
function fun1(...result:number[]):number{
    var sum=0;
    for(var i=0;i<result.lengt;i++){
        sum+=i
    }
    return sum
}
 fun1(1,2,3,4,6,7,8)  //31
```

##### 5.ts函数重载

>java中的重载:重载指的是存在两个或两个以上同名函数,但是参数不一样,这时就会出现函数重载的情况.
>typeScript中的重载:通过为同一个函数提供多个函数类型定义来实现多种功能的目的
>ts为了兼容ES5和ES6,重载的写法和java有区别

```typescript
//ES5出现同名的函数方法,下面的会把上面的覆盖
function fun1():number{
    return 1
}
function fun1():number{
    return 2
}
fun1() // 2
//ts的函数重载
function fun2(name:string):string;
function fun2(name:string,age:number):string;
function fun2(name:any,age?:any):any{
    if(age){
     	 return `我的名字是:${name},我今年${age}岁` 
    }else{
        return `我的名字是:${name}`
    }
};
fun2('张三',20) //我的名字是:张三,我今年20岁
fun2('张三') //我的名字是:张三
fun2(20) //ts报错
```

##### 6.箭头函数

> this指向问题, 箭头函数中this指向上下文

```typescript
function fun(){
    setTimeout(()=>{
       alert('run')
   },1000)
}
```

### ES5中的类

##### 1.最简单的类

```typescript
function Person(){
    this.name='张三';
    this.age=20;
}
var p=new Person();
console.log(p.name) //张三
```

##### 2.构造函数和原型链里面增加方法

```typescript
//构造函数
function Person(){
    this.name='张三'; //属性
    this.age=20;
    this.run=function(){ //方法
        console.log(this.name+'在运动')
    }
}
//原型链上面的属性会被多个实例共享   构造函数不会
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
var p = new Person();
console.log(p.name) //张三
p.run() //张三在运动
p.work() //张三在工作
```

##### 3.类里面的静态方法

```typescript
function Person(){
    this.name='张三'; //属性
    this.age=20;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.getInfo = function(){
    conslo.log('这是一个静态方法')
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
var p = new Person()
p.work()  //张三在工作
//调用静态方法
Person.getInfo() //这是一个静态方法
```

##### 4.ES5里面继承	对象冒充实现继承

```typescript
function Person(){
    this.name='张三'; //属性
    this.age=20;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
//Web类继承Person类
//对象冒充实现继承
function Web(){
    Person.call(this)
}
var w = new Web()
w.run()  //张三在运动
w.work() //undefined在工作
//对象冒充可以继承构造函数里面的属性和方法
//但是没法继承原型链上面的属性和方法
```

##### 5.ES5里面的继承	原型链实现

```typescript
function Person(){
    this.name='张三'; //属性
    this.age=20;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
//Web类继承Person类
//原型链实现继承
function Web(){
}
Web.prototype=new Person()
var w = new Web()
w.run()  //张三在运动
w.work() //张三在工作
//原型链实现继承:可以继承构造函数里面的属性和方法,也可以继承原型链上面的属性和方法.
```

##### 6.原型链实现继承的问题

```typescript
//demo1
function Person(name,age){
    this.name=name; //属性
    this.age=age;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
var p = new Person('李四',20)
p.run()   //李四在运动

//demo2
function Person(name,age){
    this.name=name; //属性
    this.age=age;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
function Web(name,age){
}
Web.prototype = new Person()
var w = new Web('王五',30)
//实例化子类的时候没法给父类传参
w.run();  //undefined在运动
```

##### 7.原型链+对象冒充的组合继承模式

```typescript
function Person(name,age){
    this.name=name; //属性
    this.age=age;
    this.run=function(){ //实例方法
        console.log(this.name+'在运动')
    }
}
Person.prototype.sex='男';
Person.prototype.work=function(){
    conslo.log(this.name+'在工作')
}
//原型链+对象冒充的组合继承
function Web(name,age){
    //对象冒充继承  实例化子类可以给父类传参
    Person.call(this,name,age)
}
//两种方法都可以
//Web.prototype = Person.prototype   
Web.prototype = new Person()
var w = new Web('王五',30)
w.run();  //王五在运动
w.work() //王五在工作
```

### typeScript中的类

##### 1.ts中类的定义

```typescript
//ES5
function Person(name){
    this.name = name;
    this.run = function(){
        console.log(this.name)
    }
}
var p = new Person('张三')
p.run()  //张三

//ts中定义类
class Person{
    name:string; //属性  前面省略了public关键词
    constructor(n:string){  //构造函数  实例化类的时候触发的方法
        this.name=n;   //等同于上面的   this.name = name;
    }
    run():void{
        console.log(this.name)
    }
    getName():string{
        return this.name
    }
    setName(name:string):void{
        this.name=name
    }
}
var p = new Person('张三')
console.log(p.setName(p.getName()))  //张三
console.log(p.setName('李四'))  //李四
```

##### 2.ts中实现继承 extend super

```typescript
class Person{
    name:string; //属性 
    constructor(name:string){  //构造函数  实例化类的时候触发的方法
        this.name=name;
    }
    run():string{
        return `${this.name}在运动-父类`
    }
}
class Web extends Person{
    constructor(name:string){
        super(name) //初始化父类的构造函数
    }
    run():string{
        return `${this.name}在运动-子类`
    }
    work():string{
        return `${this.name}在工作`
    }
}
var w = new Web('王五')
//w.run()  //王五在运动-父类
//在子类中创建与父类同名的方法时,会优先使用子类的方法
w.run()  //王五在运动-子类 
w.work()  //王五在工作
```

##### 3.类里面的修饰符

> typeScript里面定义属性的时候给我们提供了三种修饰符
>
> public:公有	在当前类里面,子类,类外面都可以访问
>
> protected:保护类型	在当前类里面,子类可以访问,在类外部不能访问
>
> pribate:私有    在当前类里面可以访问,子类,类外部都不能访问
>
> 属性如果不加修饰符,默认就是公有(public)

```typescript
class Person{
    //public:公有	在当前类里面,子类,类外面都可以访问
	public name:string;  
	//protected:保护类型	在当前类里面,子类可以访问,在类外部不能访问
	//protected name:string; 
	//pribate:私有    在当前类里面可以访问,子类,类外部都不能访问
	//pribate name:string; 
	constructor(name:string){
	this.name=name;
	}
	run():string{
		return `${this.name}在运动`
	}
}
var p=new Person('王五');
alert(p.run())  //王五在运动

class Web extends Person{
	constructor(name:string){
		super(name);  /*初始化父类的构造函数*/
	}
	run():string{
		return `${this.name}在运动-子类`
	}
	work(){
		alert(`${this.name}在工作`)
	}
}
var w=new Web('李四');
w.work();//李四在工作


```

##### 4.静态属性	静态方法

```typescript
//ES5中的静态属性和静态方法
function Person(name){
    this.name=name
    this.run1=function(){
        console.log(this.name)
    }
}
Person.name = '张三';   //静态属性
Person.fun2=function(){   //静态方法
    console.log(Person.name)
}
var p = new Person('李四')
console.log(p.run1()) //李四
//静态方法和静态属性的调用
console.log(Person.name) //张三
console.log(Person.fun2()) //张三

//ts中的静态属性和静态方法
class Person{
    public name:string;
    public age:number=20;
    static sex:string = '男' //静态属性
    constroctor(name:string){
        this.name=name
    }
    run():void{
        console.log(this.name+this.age+'-构造方法')
    }
    static work():void{  //静态方法
        console.log(Person.sex+'静态方法')
    }
}
var p = new Person('张三')
p.run() //张三20-构造方法
Person.work() //男-静态方法
```

##### 5.多态

> 父类定义一个方法不去实现,让继承他的子类去实现,每一个子类有不同的表现
>
> 多态属于继承

```typescript
class Animal{
    public name:string;
    constructor(name:string){
        this.name=name
    }
    eat(){ //具体吃什么不知道 由继承他的子类去实现
        console.log('吃的方法')
    }
}
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        return thia.name+'吃狗粮'
    }
}
class Cat extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        return thia.name+'吃猫粮'
    }
}
var d = new Dog('旺财')
d.eat();	//旺财吃狗粮
var c = new Cat('翠花')
c.eat();	//翠花吃猫粮
```

##### 6.抽象类

> typeScript中的抽象类:它是提供其他类继承的基类,不能直接被实例化
>
> 用abstract关键字定义抽象类和抽象方法,抽象类中的抽象方法不包含具体实现,并且必须在派生类中实现,
>
> abstract抽象方法只能在抽象类里面
>
> 抽象类和抽象方法用来定义标准,例如: Animal这个类要求他的子类必须包含并实现eat方法

```typescript
abstract class Animal{
    public name:string;
    constructor(name:string){
        this.name = name
    }
    run():void{
        console.log('这是一个普通的方法')
    }
    abstract eat():any; //抽象方法不包含具体实现,并且必须在派生类中实现.
}
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    //派生类中必须实现抽象类里面的抽象方法
    eat(){
        console.log(this.name+'吃狗粮')
    }
}
class Cat extends Animal{
    constructor(name:string){
        super(name)
    }
    //派生类中必须实现抽象类里面的抽象方法
    eat(){
        console.log(this.name+'吃猫粮')
    }
}
var d=new Dog('来福');
d.eat();  //来福吃狗粮
d.run();  //这是一个普通的方法

var c=new Cat('小花');
c.eat();  //小花吃猫粮
```

##### 7.typeScript中的接口

> 接口的作用:在面向对象的编程中,接口是一种规范的定义,它定义了行为和动作的规范,在程序设计里面,接口起到一种限制和规范的作用.
>
> 接口定义了某一批类所需要遵守的规范,接口不关心这些类的内部状态数据,也不关心这些类里方法的实现细节,他只规定这批类里必须提供某些方法,提供这些方法的类就可以满足实际需求,typeScript中的接口类似于java,同时还增加了更灵活的接口类型,包括属性,函数,可索引和类等.

```typescript
//1.属性接口
//ts中定义方法
function printLabel():void{
    console.log('printLabel')
}
printLabel() //printLabel

//ts中定义方法且传入参数
function printLabel(label:string):void{
    console.log(label)
}
printLabel('hahaha') //hahaha

//ts中自定义方法传入参数,并进行约束
function printLabel(labelInfo:{label:string}){
    console.log('printLabel')
}
printLabel('hahah')  //错误的写法
printLabel(name:'hahha')  //错误的写法
printLabel({label:'haha'}) //正确的写法

//对批量方法传入参数进行约束
//接口:行为和动作的规范,对批量方法进行约束
//就是传入对象的约束     属性接口
interface FullName{
    firstName:string;  //使用;结束
    lastName:string;
}
function printName(name:FullName){
    //必须传入对象 ,且包含firstName,lastName
    console.log(firstNaem+lastName);
}
printName('123')  //错误的写法
var obj={
    age:20,
    firstName:'张',
    lastName:'三'
};
//传入对象的值最好与接口一致,其他的值在函数中使用时 ts会报错
printName(obj)  //正确的写法   张三
//参数的顺序可以不一样
printName({
    lastName:'四',
    firstName:'李' 
})    // 李四

//接口的可选属性
interface FullName{
    firstName:string; 
    lastName?:string;
}
function printName(name:FullName){
    console.log(firstNaem+lastName);
}
var obj={
    firstName:'张',
};
printName(obj)  //  张

//2.函数类型接口:对方法传入的参数 以及返回的参数进行约束/批量约束
//加密的函数类型接口
interface encrypt{
    (key:string,value:string):string;
}
var md5:encrypt=function(key:string,value:string):string{
        //模拟操作
        return key+value;
}
console.log(md5('name','zhangsan')); // namezhangsan
var sha1:encrypt=function(key:string,value:string):string{
    //模拟操作
    return key+'----'+value;
}
console.log(sha1('name','lisi'));//name----list

//3.可索引接口：数组、对象的约束  （不常用）
//ts定义数组的方式
var arr:number[]=[2342,235325]
var arr1:Array<string>=['111','222']
//可索引接口 对数组的约束
interface UserArr{
    [index:number]:string  
}
var arr:UserArr=['aaa','bbb'];
console.log(arr[0]); //aaa
var arr:UserArr=[123,'bbb'];  /*错误*/

//可索引接口 对对象的约束
interface UserObj{
    [index:string]:string
}
var arr:UserObj={name:'张三'};

//类类型接口:对类的约束和抽象类抽象有点相似    
interface Animal{
    name:string;
    eat(str:string):void;
}
class Dog implements Animal{
   name:string;
   constructor(name:string){
      this.name=name;

   }
   eat(){
   console.log(this.name+'吃粮食')
   }
}
var d=new Dog('小黑');
d.eat();  //小黑吃粮食
class Cat implements Animal{
   name:string;
   constructor(name:string){
      this.name=name;
   }
   eat(food:string){
     console.log(this.name+'吃'+food);
    }
}
var c=new Cat('小花');
c.eat('老鼠'); //小花吃老鼠

//4.接口扩展 :接口可以继承接口
interface Animal{
    eat():void;
}
interface Person extends Animal{
    work():void;
}
class Programmer{
    public name:string;
        constructor(name:string){
            this.name=name;
        }
        coding(code:string){
            console.log(this.name+code)
        }
}
class Web extends Programmer implements Person{
    public name:string;
    constructor(name:string){
        this.name=name
    }
    eat(){
        console.log(this.name+"吃东西")
    }
    work(){
        console.log(this.name+"在工作")
    }
}

var w = new Person('小李')
w.eat()   //小李在吃东西
w.work()  //小李在工作
w.coding('TYPESCRIPT')  //小李TYPESCRIPT
```

### typeScript中的泛型

> 泛型:软件工程中,我们不仅要创建一致的定义良好的API,同时也要考虑可重用性.组件不仅能够支持当前的数据类型,同时也能支持未来的数据类型,这在创建大型系统时为你提供了十分灵活的功能.
>
> 在像C#和Java这样的语言中,可以使用泛型来创建可重用的组件,一个组件可以支持多种类型的数据.这样用户就可以以自己的数据类型来使用组件.
>
> 通俗理解:泛型就是解决类,接口,方法,的复用性,以及对不特定数据类型的支持(类型校验)

```typescript
//只能返回string类型的数据
function getData(value:string):string{
    return value
}
//同时返回 string类型 和number类型  （代码冗余)
function getData1(value:string):string{
    return value;
}
function getData2(value:number):number{
    return value;
}
//同时返回string类型和number类型   any可以解决这个问题
//但是any放弃了类型检查 传入的参数类型和返回的参数类型可以不一致
function getData(value:any):any{
    return 'hahaha'
}
getData('123')
getData(123)
/*
泛型:可以支持不特定的数据类型
要求:传入的参数与返回的参数一致
比如:传入number 类型必须返回number类型
T(任意字符)表示泛型,具体什么类型是调用这个方法的时候决定的
*/
function getData<T>(value:T):T{
    return value
}
getData<string>('123') //参数必须是string类型
getData<number>(123)
//泛型类:比如有一个最小堆算法,需要同时支持返回数字和字母a-z两种类型.
//通过普通类实现
class MinClass{
    public list:number[]=[];
    add(num:number){
        this.list.push(num)
    }
    min():number{
        var minNum=this.list[0];
        for(var i=0;i<this.list.length;i++){
            if(minNum>this.list[i]){
                minNum=this.list[i];
            }
        }
        return minNum;
    }
}
var m=new MinClass();
m.add(3);
m.add(22);
m.add(23);
m.add(6);
m.add(7);
alert(m.min());
//通过类的泛型实现
class MinClass<T>{
    public list:T[]=[];
    add(num:T){
        this.list.push(num)
    }
    min():void{
        var minNum=this.list[0];
        for(var i=0;i<this.list.length;i++){
            if(minNum>this.list[i]){
                minNum=this.list[i];
            }
        }
        return minNum;
    }
}
var m=new MinClass<number>(); //实例化类  并且指定了类的T代表的类型是number
m.add(3);
m.add(22);
m.add(23);
m.add(6);
m.add(7);
alert(m.min());  //3

//泛型接口(1)
interface ConfigFn{
    <T>(value:T):T;
}
var getData:ConfigFn=function<T>(value:T):T{
    return value;
}
getData<string>('张三')
getData<number>(123)

//泛型接口(2)
interface ConfigFn<T>{
    (value:T):T;
}
function getData<T>(value:T):T{
    return value;
}
var my:ConfigFn<string> = getData
 my('张三')
```

