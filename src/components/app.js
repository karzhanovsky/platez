import React, { Component } from 'react';
import CurrentUser from '../containers/current-user';
import SearchBar from './search-bar';
import SinglePlate from './single-plate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <CurrentUser />
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
