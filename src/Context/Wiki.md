#### React Context

- [简述](#简述)
- [作用](#作用)
- [缺点](#缺点)
- [创建Context对象](#创建Context对象)
- [父组件设置传递值](#父组件设置传递值)
- [子组件取值](#子组件取值)
- [混合嵌套](#混合嵌套)

##### 简述
React的Context API使用，React版本为16.6.0

##### 作用
很多个子组件（这些子组件可能处在不同的层级）从同一个父组件取值时，
传统的写法需要一层层的往下传递这些值，但当值的数量增多，
层级变深之后，容易出错，也不易修改维护，若使用Context，
可以在父组件用Context的Provider包裹这些子组件，子组件需要用到某个值时，
只需要引入对应的Context，即可取到想要的值。总的来说，
它打破了常规子父组件传值时层的限制。

##### 缺点
虽然很大程度上减少了代码的书写，但却使得组件的耦合性变高，
组件复用度会变低；所以大多数情况下，
使用嵌套组件（Component Composition）的写法代替Context也能达到相同效果，
并且组件不会有较高的耦合性

##### 创建Context对象
```jsx
// 使用Context传递的值可以是原始类型，也可以是复杂对象
// 如下所示，defaultValue就是一个复杂对象
const defaultValue = {
    number: 1,
    string: 'string',
    array: [],
    fn: () => {}
};

// 注意！进行传值的子父组件必须引用同一个Context对象
export const Context = React.createContext(defaultValue);
```
##### 父组件设置传递值
```jsx
// 引入已创建的Context对象
// 与子组件相同的Context对象
import { Context } from './Context.js';

// 这里的中间组件只是为了演示隔层取值
// 实际使用中可能会有更深的层级
const MiddleComponent = () => {
    return (
        <div>
            <StateLessComponent/>
            <StateComponent/>
        </div>
    );
};

// 这里的父组件类型（有状态和无状态组件）并无限制
class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: { des: 'parent' }
        };
    }

    render() {
        return (
            <Context.Provider value={this.state.data}>
                <MiddleComponent/>
            </Context.Provider>
        );
    }
}
```

##### 子组件取值
```jsx
// 引入Context对象
// 与父组件相同的Context
import { Context } from './Context.js';

// 无状态组件取值
const StateLessComponent = () => {
    return (
        <Context.Consumer>
            {(value) => {
                return `收到的值为：${value.des}`;
            }}
        </Context.Consumer>
    );
};

// 有状态组件取值
class StateComponent extends React.Component {
    static contextType = Context;

    render() {
        return `收到的值为：${this.context.value.des}`;
    }
}
```

##### 混合嵌套
不同Context的Provider是可以嵌套的，传值互不干扰，
Context的Consumer只会取离自己层级最近的那个自己的Provider传递的值，
如下
```jsx
// 子组件
const ChildComponent = () => {
    return (
        <ContextOuter.Consumer>
           {valueOuter => (
                <ContextInner.Consumer>
                    {valueInner => `valueOuter:${valueOuter},valueInner:${valueInner}`}
                <ContextInner.Consumer/>
           )}
        </ContextOuter.Consumer>
    );
};

// 父组件
class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            data1: 1,
            data2: 2
        };
    }

    render() {
        return (
            <ContextOuter.Provider value={this.state.data1}>
                <ContextInner.Provider value={this.state.data2}>
                    <ChildComponent/>
                </ContextOuter.Provider>
            </ContextOuter.Provider>
        );
    }
}
```