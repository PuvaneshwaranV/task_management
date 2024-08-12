import React from 'react';
import { BrowserRouter as Router, Route, useNavigate,Routes} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root1 = ReactDOM.createRoot(document.getElementById('root1'));
root1.render(
    <Provider store={store}>
    <Router>
   <App/></Router>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
