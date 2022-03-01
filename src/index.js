import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Switch } from "react-router-dom";
import PageLayout from '../src/components/PageLayout';
import SharedList from '../src/components/SharedList';
import Landing from '../src/components/Landing';
import TopContent from './components/TopContent';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={PageLayout}></Route>
        <Route exact path="/lists" component={SharedList}></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
