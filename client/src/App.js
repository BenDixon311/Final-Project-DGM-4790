import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
          <Switch>
            <Route
                //add route here!
            ></Route>
          </Switch>

       <Footer />
      </div>
    );
  }
}

export default withRouter(App);
