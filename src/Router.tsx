import React, { useEffect } from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import UserListContainer from './containers/UserListContainer';
import UserDetailContainer from './containers/UserDetailContainer';

import logo from './logo.svg';

export const history = createBrowserHistory();

export default function AppRouter() {

    return (
        <Router history={history}>
          <div className="App">
            <header className="p-3 bg-dark text-white">
              <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img className="bi me-2" width="40" height="32" role="img" src={logo} />
                  </Link>
                </div>
              </div>
            </header>
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserListContainer} />
                <Route exact path="/user/:id" component={UserDetailContainer} />
                <Route exact path="/user" component={UserDetailContainer} />
              </Switch>
              </div>
          </div>
        </Router>
    )
}
