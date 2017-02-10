import React from 'react';
import {
    render
} from 'react-dom';
import App from './components/App';
import store from './store';
import './styles/reset.css';
import './styles/index.css';

var meta = document.createElement( 'meta' );
meta.name = "viewport";
meta.content = "height=device-height, width=device-width, initial-scale=1.0, user-scalable=no";
document.head.appendChild( meta );

render( <App store={store}/>, document.getElementById( 'root' ) );