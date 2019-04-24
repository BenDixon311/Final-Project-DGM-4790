import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route, withRouter } from 'react-router-dom';
import AddGraphql from './components/Add-Graphql';
import AddRest from './components/Add-Rest';
import HomeRest from './components/Home-Rest';
import HomeGraphql from './components/Home-Graphql';
import PlayerDetail from './components/PlayerDetail';

class App extends Component {
  render() {
    return (
      <div>
       <Header />
          <Switch>
            <Route exact path = "/HomeRest" component={HomeRest} />
            <Route exact path = "/HomeGraphql" component={HomeGraphql} />
            <Route exact path = "/AddRest" component={AddRest} />
            <Route exact path = "/AddGraphql" component={AddGraphql} />
            <Route exact path = "/PlayerDetail/:name" 
            component={PlayerDetail}
            render={props => <PlayerDetail {...props} />}
             />
          </Switch>

       <Footer />
      </div>
    );
  }
}

export default withRouter(App);
