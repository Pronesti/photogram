import React, { Component } from 'react';
import './App.css';
import TheNavbar from './Components/TheNavbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Upload from './Pages/Upload';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Individual from './Pages/Individual';
import ExProfile from './Pages/ExProfile';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <div>
            <TheNavbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/upload/' component={Upload} />
              <Route path='/profile/' component={Profile} />
              <Route path='/register/' component={Register} />
              <Route path='/login/' component={Login} />
              <Route path='/user/:displayName' component={ExProfile} />
              <Route path='/post/:postid' component={Individual} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
