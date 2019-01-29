import React from 'react';
import { context as Context } from './Context';

/**
 * 函数式组件（无状态组件）使用Provider提供的值
 * @param text
 * @param fontColor
 * @return {*}
 * @constructor
 */
const FunctionalConsumer = ({ text, fontColor }) => {
    const timestamp = new Date().getTime();
    return (
        <Context.Consumer>
            {({ data: { name, sex }, toggleUser }) => {
                const style = {
                    color: fontColor
                };
                return (
                    <div style={style}>
                        {timestamp}:&nbsp;&nbsp;&nbsp;&nbsp;
                        {text}&nbsp;&nbsp;&nbsp;&nbsp;
                        {name}&nbsp;&nbsp;&nbsp;&nbsp;
                        {sex}&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={toggleUser}>toggle user</button>
                    </div>
                );
            }}
        </Context.Consumer>
    );
};

/**
 * 有状态组件使用Provider提供的值
 */
class ClassConsumer extends React.Component {
    static contextType = Context;

    render() {
        const { fontColor, text } = this.props;
        const { data: { name, sex }, toggleUser } = this.context;
        const style = {
            color: fontColor
        };
        const timestamp = new Date().getTime();
        return (
            <div style={style}>
                {timestamp}:&nbsp;&nbsp;&nbsp;&nbsp;
                {text}&nbsp;&nbsp;&nbsp;&nbsp;
                {name}&nbsp;&nbsp;&nbsp;&nbsp;
                {sex}&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={toggleUser}>toggle user</button>
            </div>
        );
    }
}

export { FunctionalConsumer, ClassConsumer };
