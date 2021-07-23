# dva

在umi中使用dva

1. 需要模板的话可以先使用umi ui创建umi2的脚手架，然后手动升级到umi3

2. `namespace` 表示在全局 state 上的 key，如果不填写，会默认使用文件名作为`namespace`

3. `state` 是初始值，可以是任意JavaScript数值类型

4. `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state，是dva中唯一可以直接修改`state`的地方

5. `effect`被称为副作用，在我们的应用中，最常见的就是异步操作。它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。

6. `Subscription` 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

7.  `Action `是用来描述 UI 层事件的一个对象。

8. `connect` 是一个函数，绑定 `State` 到 `View`。

   1. ```js
      import { connect } from 'dva';
      
      function mapStateToProps(state) {
        return { todos: state.todos };
      }
      connect(mapStateToProps)(App);
      ```

      connect 方法返回的也是一个 React 组件，通常称为容器组件。因为它是原始 UI 组件的容器，即在外面包了一层 State。

      connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。

9. `dispatch` 是一个函数方法，用来将 Action 发送给 State。

   1. ```js
      dispatch({
        type: 'click-submit-button',
        payload: this.form.data
      })
      ```

10. 任务并行执行

    1. ```js
       const [result1, result2]  = yield all([
         call(service1, param1),
         call(service2, param2)
       ])
       ```

11. 任务的竞争

    1. ```js
       const { data, timeout } = yield race({
         data: call(service, 'some data'),
         timeout: call(delay, 1000)
       });
       
       if (data)
         put({type: 'DATA_RECEIVED', data});
       else
         put({type: 'TIMEOUT_ERROR'});
       /*
       这个例子比较巧妙地用一个延时一秒的空操作来跟一个网络请求竞争，如果到了一秒，请求还没结束，就让它超时。
       这个类似于Promise.race的作用。
       */
       ```

    

    

### 使用useSelector useDispatch 替代connect及dva中使用

### 前言

随着`react hooks`越来越火，`react-redux`也紧随其后发布了`7.1`([https://react-redux.js.org/ap...](https://react-redux.js.org/api/hooks#using-hooks-in-a-react-redux-app)版本)

首先是几个`API`

- useSelector()

```
const result : any = useSelector(selector : Function, equalityFn? : Function)
```

主要作用：
从`redux`的`store`对象中提取数据(`state`)。

> 注意：选择器函数应该是纯函数，因为它可能在任意时间点多次执行。

```
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}
```

- useDispatch()

```
const dispatch = useDispatch()
```

返回`Redux` `store`中对`dispatch`函数的引用。你可以根据需要使用它。

```
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

将回调使用`dispatch`传递给子组件时，建议使用来进行回调`useCallback`，因为否则，由于更改了引用，子组件可能会不必要地呈现。

```
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```

- useStore()

```
const store = useStore()
```

这个`Hook`返回`redux` ``组件的`store`对象的引用。

这个钩子应该不长被使用。`useSelector`应该作为你的首选。但是，有时候也很有用。来看个例子：

```
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // 仅仅是个例子! 不要在你的应用中这样做.
  // 如果store中的state改变，这个将不会自动更新
  return <div>{store.getState()}</div>
}
```

### dva中如何使用

`dva`在`dva@2.6.0[1]`的beta版本发布了这几个`API`，如果我们想使用他，首先安装指定版本的

```
yarn add dva@2.6.0-beta.19 
// or
npm install dva@2.6.0-beta.19
```

并且这样使用

```
import { useSelector, useDispatch } from 'dva';
```

如果不想升级`dva`版本的话我们需要安装

```
yarn add react-redux@7.1.0
```

并且这样使用

```
import { useSelector, useDispatch } from 'react-redux';
```

首先先看原始`dva`的写法
先定义一个`user model`

```
// 1.user.js ==>model
export default {
  namespace: 'user',
  state: {
    userInfo:null,
  },
  effects: {
      *fetchUser({paylaod},{call,put}){
          const res = yield(api,payload)
          yield put({
            type: 'save',
            payload: {
                userInfo:res   
            },
          });
      }
  },
  reducers:{
      save(state, { payload }) {
        return {
            ...state,
            ...payload,
        };
      },
  }
}
```

然后在页面中使用

```
import {connect} from 'dva'

const Home = props=>{
    // 获取数据
    const {user,loading,dispatch} = props
    
    // 发起请求
    useEffect(()=>{
        dispatch({
            type:'user/fetchUser',payload:{}
        })
    },[])
    
    // 渲染页面
    if(loading) return <div>loading...</div>
    return (
        <div>{user.name}<div>
    )
}

export default connect(({loading,user})=>({
    loading:loading.effects['user/fetchUser'],
    user:user.userInfo
}))(Home)
```

`connect`这个高阶组件里定义了太多东西，这种写法太恶心了。
如果太多数据从`props`获取的话，`connect`里堆了太多代码

下面我们使用`useDispatch` `useSelector` 优化上面的代码

```
import {useDispatch,useSelector} from 'dva'

const Home = props=>{
    
    const dispatch = useDispatch()
    
    const loadingEffect = useSelector(state =>state.loading);
    const loading = loadingEffect.effects['user/fetchUser'];
    const user = useSelector(state=>state.user.userInfo)
    
    // 发起请求
    useEffect(()=>{
        dispatch({
            type:'user/fetchUser',payload:{}
        })
    },[])
    
    // 渲染页面
    if(loading) return <div>loading...</div>
    return (
        <div>{user.name}<div>
    )
}

export default Home
```









