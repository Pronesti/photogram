import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './../node_modules/spectre.css/dist/spectre.min.css';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBjmxJu4fuOOFqmCksGhAYID3Rz2sW0l4E',
  authDomain: 'nextphotogram.firebaseapp.com',
  databaseURL: 'https://nextphotogram.firebaseio.com',
  projectId: 'nextphotogram',
  storageBucket: 'nextphotogram.appspot.com',
  messagingSenderId: '1071195623566'
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
