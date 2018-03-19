var React = require("react");
var ReactDOM = require("react-dom");
var redux = require("redux");
var Provider = require("react-redux").Provider;
var reducer = require("./reducers/appReducer.jsx");
var AppView = require("./views/appview.jsx");
import './styles/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
var store = redux.createStore(reducer);
 
// store.dispatch({
//   type: "SET_STATE",
//   state: {
//     phones: [ "iPhone 7 Plus", "Samsung Galaxy A5" ]
//   }
// });
 
 
ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById("app")
);