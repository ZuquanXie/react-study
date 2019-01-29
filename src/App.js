/* global window */
import React, { Component } from 'react';
import Context from './Context';
import './App.css';

const AppLinksList = ({ appIndex }) => {
    const linkNodes = [];
    for (let key in appIndex) {
        if (appIndex.hasOwnProperty(key)) {
            linkNodes.push(
                <a key={key} href={key}>
                    <li>{key.substr(1)}</li>
                </a>
            )
        }
    }
    return (
        <ul>
            {linkNodes}
        </ul>
    )
};

const appIndex = {
    '/Context': <Context/>
};

class App extends Component {
    render () {
        return (
            <div className="App">
                {appIndex[window.location.pathname] || <AppLinksList appIndex={appIndex} />}
            </div>
        );
    }
}

export default App;
