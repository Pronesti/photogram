import React, { Component } from 'react';
import './App.css';
import TheNavbar from './Components/TheNavbar';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Upload from './Pages/Upload';
import User from './Pages/User';

class App extends Component {
  render() {
    return (
      <div className="App">
      
      <BrowserRouter>
      <div>
      <TheNavbar />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/upload/" component={Upload} />
      <Route path="/profile/" component={Profile} />
      <Route path="/login/" component={User} />
      <Route path="/signin/" component={User} />
        </Switch>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
