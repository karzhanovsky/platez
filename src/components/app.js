import React, { Component } from 'react';
import UserController from '../containers/user-controller';
import SplashScreen from './splash-screen';
import SinglePlate from './single-plate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="wrap">
        <UserController />
        <BrowserRouter>
          <Switch>
            <Route path='/plate/:id' component={SinglePlate} />
            <Route path='/' component={SplashScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
