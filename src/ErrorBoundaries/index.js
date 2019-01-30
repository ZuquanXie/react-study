import React from 'react';
import Actor from './ActorComponent';

/**
 * 当子组件发生错误（仅来自子组件生命周期、渲染和构造函数的错误）时，将被此组件捕获
 * 开发环境下，页面发生错误时，页面上会有一个错误信息报告的消息层，
 * 点右上角关闭按钮（X）即可看到页面原本的内容
 */
class ErrorBoundaries extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {
        this.setState(() => ({ hasError: true, }));
    }

    render() {
        if (this.state.hasError) {
            return <p>An errors was happened.(From:{this.props.moduleName})</p>;
        }
        return this.props.children;
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <ErrorBoundaries moduleName="actorA">
                    <Actor name="A"/>
                </ErrorBoundaries>
                <ErrorBoundaries moduleName="actorB">
                    <Actor name="B"/>
                </ErrorBoundaries>
                <ErrorBoundaries moduleName="actorC">
                    <Actor name="C"/>
                </ErrorBoundaries>
                <ErrorBoundaries moduleName="actorD">
                    <Actor name="D"/>
                </ErrorBoundaries>
            </div>
        );
    }
}

export default Content;
