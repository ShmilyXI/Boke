# React

1. 在子组件外层包裹一层组件进行权限控制，如果这时候需要在父组件中操作props.children,给其增加props属性，可以使用React.cloneElement(children,{props});

2. 函数式组件调用子组件的方法（子组件函数式组件）

   ```jsx
   /* ---------- 父组件 ---------- */
   import React, { useRef } from 'react';
   const childrenRef = useRef(); // 生成ref
   <Children ref={childrenRef} />
   
   /* ---------- 子组件 ---------- */
   import React, { useImperativeHandle,forwardRef } from 'react';
   const Children =(props,ref)=>{
     // 向父组件暴露方法
   	useImperativeHandle(
       ref,
       () => ({
         getChildrenFun: childrenFun,
       }),
       [childrenFun]
     );
     const childrenFun=()=>{
       console.log('This is children function!')
     }
   }
   // 暴露方法的时候需要使用forwardRef包裹组件
   export default forwardRef(Children);
   
   /* ---------- 父组件调用子组件方法 ---------- */
   childrenRef.current.getChildrenFun(); 
   // console.log ---> 'This is children function!'
   ```

3. 函数式组件调用子组件的方法（子组件为class组件）

   ```jsx
   /* ---------- 父组件 ---------- */
   import React, { useState } from 'react';
   const [childrenRef, setChildrenRef] = useState({}); // 子组件ref
   <Children setRef={setChildrenRef} />
   
   /* ---------- 子组件 ---------- */
   export default class Children extends Component {
   	constructor(props){
       props.setRef(this); // 绑定this来模拟ref实现
     }
     childrenFun=()=>{
       console.log('This is children function!')
     }
   }
   /* ---------- 父组件调用子组件方法 ---------- */
   childrenRef.childrenFun();
   // console.log ---> 'This is children function!'
   ```

4. 函数式组件父组件引入子组件全部方法

   ```jsx
   /* ---------- 父组件 ---------- */
   import React, { useRef } from 'react';
   const childrenRef = useRef(); // 生成ref
   <Children ref={childrenRef} />
   
   /* ---------- 子组件 ---------- */
   import React, { forwardRef } from 'react';
   const Children =(props,ref)=>{
     const childrenFun=()=>{
       console.log('This is children function!')
     }
   }
   // 暴露方法的时候需要使用forwardRef包裹组件
   export default forwardRef(Children);
   
   /* ---------- 父组件调用子组件方法 ---------- */
   childrenRef.current.getChildrenFun(); 
   // console.log ---> 'This is children function!'
   ```
   
   
   
5. React中渲染HTML字符串

   ```jsx
   <div dangerouslySetInnerHTML={{ __html: "<h1>hello world!</h1>" }}></div>
   ```


### 常见问题(坑)

1. 在钉钉中使用formData发送数据的时候,会默认吧请求的contentType变为application/json 

2. antd的datepicker组件传的时间少8个小时

   > 是因为moment格式化使用了 `this.toDate().toISOString()
   >
   > 因此需要改写该moment日期格式化方法

   ```js
   // 两种格式化日期时间方法，解决时间提交后因时区问题减了8小时
   // 第一种方法，通过axios的方法增加过滤moment类型数据进行格式化
   axios.defaults.transformRequest.unshift((params) => {
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] instanceof moment) {
            params[key] = params[key].format('YYYY-MM-DDTHH:mm:ss.SSS\\Z')
          }
        })
      }
      return params
    })
   // 第二种直接覆盖moment中的toISOString方法
   moment.fn.toISOString = function () {
     return this.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
   }
   ```



