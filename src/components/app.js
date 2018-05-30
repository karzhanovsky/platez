import React, { Component } from 'react';
import UserController from '../containers/user-controller';
import SplashScreen from './splash-screen';
import SinglePlate from './single-plate';
import Account from './account';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="wrap">
        <BrowserRouter>
          <div>
          <UserController />
            <Switch>
              <Route exact path='/plate/:id' component={SinglePlate} />
              <Route exact path='/konto' component={Account} />
              <Route exact path='/' component={SplashScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
