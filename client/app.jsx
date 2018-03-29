var React = require("react");
var ReactDOM = require("react-dom");
var redux = require("redux");
var Provider = require("react-redux").Provider;
var reducer = require("./reducers/appReducer.jsx");
var NewsView = require("./views/NewsView");

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/Home';

var store = redux.createStore(reducer);


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/News" component={NewsView} />
      </Switch>
    </Provider>
  </Router>,

  document.getElementById("app")
);