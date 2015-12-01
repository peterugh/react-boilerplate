import App from 'display/App';
import Index from 'display/Index';
import SubPage from 'display/SubPage';
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router';

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="subpage" component={SubPage} />
    </Route>
  </Router>
), document.getElementById('App'));