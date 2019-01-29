/**
 * React 上下文(新版的api，Context)组件的使用
 */

import React from 'react';
import { context, users } from './Context';
import { FunctionalConsumer, ClassConsumer } from './Consumer';

const { Provider } = context;

class ContextDemo extends React.Component {
    constructor () {
        super();
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            user: {
                data: users[0],
                toggleUser: this.toggleUser
            }
        };
    }

    toggleUser() {
        this.setState(({ user }) => {
            user.data = user.data === users[0] ? users[1] : users[0];
            return { user };
        });
    }

    render() {
        return (
            <div>
                <Provider value={this.state.user}>
                    <ClassConsumer fontColor="#aa4400" text="classComponent:"/>
                    <br/>
                    <FunctionalConsumer fontColor="#0055aa" text="functionalComponent:"/>
                </Provider>
            </div>
        );
    }
}

export default ContextDemo;
