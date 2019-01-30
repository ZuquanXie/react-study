/* global window */
import React, { Component } from 'react';
import Context from './Context';
import ErrorBoundaries from './ErrorBoundaries';
import './App.css';

const appIndex = {
    'Context': <Context/>,
    'ErrorBoundaries': <ErrorBoundaries/>
};

const AppLinksList = ({ appIndex }) => {
    const linkNodes = [];
    for (let key in appIndex) {
        if (appIndex.hasOwnProperty(key)) {
            linkNodes.push(
                <a key={key} href={`?m=${key}`}>
                    <li>{key}</li>
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

class App extends Component {
    render () {
        let moduleParam, moduleName;
        try {
            moduleParam = window.location.search
            .slice(1)
            .split('&')
            .filter(_ => _.match(/^m=*/gi) !== null);
            moduleName = moduleParam[0].slice(2);
        } catch (e) {
        }
        return (
            <div className="App">
                {appIndex[moduleName] || <AppLinksList appIndex={appIndex} />}
            </div>
        );
    }
}

export default App;
