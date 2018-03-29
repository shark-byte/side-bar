import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';
import '../dist/styles.css';
import '../dist/fontawesome-all.min.js';

if (typeof window !== "undefined"){ 
  ReactDOM.render(<App data={window.sideBarData} />, document.getElementById('sidebar-app'));
}

export {App}
