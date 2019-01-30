#### React Error Boundaries

##### 简述
React Error Boundaries 的使用，测试时React 版本 16.6.0，Api需要React版本在16以上。

##### 注意
React的ErrorBoundaries仅能捕获和处理那些来自子组件的生命周期、渲染和构造函数执行时产生的错误，
而来自事件函数、异步操作（计时器，数据请求等）、服务端渲染和自己产生的错误则不能被捕获，
如未特殊说明，以下文中所述的错误均指前者。

##### 作用
- 当某个React节点发生错误时，可能会使得整个应用崩溃，其他的功能不能使用，
也无法显示任何内容，即使这只是某个无关紧要的组件产生的错误。
所以手动地进行错误处理，可以有效提升用户体验。
- 当一个功能模块发生错误时，我们希望其他独立的功能模块仍可正常使用，不受其影响，
则可以使用ErrorBoundaries去捕获各个独立模块的错误，分别处理，互不影响。

##### 创建ErrorBoundaries组件
一个普通的有状态组件，加上静态方法getDerivedStateFromError，
或者加上生命周期函数componentDidCatch后就可作为一个ErrorBoundaries组件，
当组件同时具有这两个函数，子组件发生错误时，会先执行getDerivedStateFromError，
再执行componentDidCatch。
```jsx
class ErrorBoundries extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
            errorMsg: null
        };
    }

    // 此方法会先于componentDidCatch执行
    // 此方法返回的对象会整个覆盖组件的state
    // 与setState的状态更新稍有不同
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // err为捕获到的错误，info为错误的详细信息，包括错误发生的组件栈
    // 可在此处理错误，更新state
    // 若在此处更新state，则与getDerivedStateFromError重复，正常使用时取其一
    componentDidCatch(err, info) {
        // 显示或报告一些错误
        this.setState({
            hasError: true,
            errorMsg: err.message
        });
    }

    render() {
        if (this.state.hasError) {
            return <p>`some errors were happened.(${this.props.moduleName})`</p>;
        }
        return this.props.children;
    }
}
```

##### 使用ErrorBoundaries组件
被同一个ErrorBoundaries组件包裹的任意子组件发生错误时，
错误均会被该ErrorBoundaries捕获并处理，
但各个ErrorBoundaries组件互不影响，
如此便可将应用中的独立功能模块分开，当一个模块发生错误时，
不会影响其他模块的正常渲染和使用。
```jsx
class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div id="myApp">
                <ErrorBoundaries moduleName="Module1">
                    <Module1/>
                </ErrorBoundaries>
                <ErrorBoundaries moduleName="Module2">
                    {/* 其他模块发生错误时，Module2仍然可以正常工作，反之亦然 */}
                    <Module2/>
                </ErrorBoundaries>
                <ErrorBoundaries moduleName="Module3">
                    <Module3Of1/>
                    <Module3Of2/>
                </ErrorBoundaries>
                ...
            </div>
        );
    }
}
```