import React from 'react';

class ErrorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        throw new Error('this is an error that is from ErrorComponent.');
        return '';
    }
}

export default ErrorComponent;
