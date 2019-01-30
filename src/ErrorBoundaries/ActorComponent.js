import React from 'react';

class Actor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: props.name,
            age: 0
        };
    }

    componentDidMount() {
        this._timerAutoRefresh = setInterval(() => {
            if (Math.random() < 0.1) {
                this.setState({ age: null });
                return;
            }
            this.setState(({ age }) => ({ age: age + 1 }));
        }, 4000);
    }

    componentWillUnmount() {
        clearInterval(this._timerAutoRefresh);
    }

    render() {
        const timestamp = new Date().getTime();
        const { name, age } = this.state;
        if (age === null) {
            clearInterval(this._timerAutoRefresh);
            throw new Error(`An error from actor ${name}`);
        }
        return <p>I'm actor {name},age：{age}, time: {timestamp}</p>;
    }
}

export default Actor;
