import React, { Component } from 'react';
import UserController from '../containers/user-controller';
import SearchBar from './search-bar';
import SinglePlate from './single-plate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <UserController />
        <BrowserRouter>
          <Switch>
            <Route path='/plate/:id' component={SinglePlate} />
            <Route path='/' component={SearchBar} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
