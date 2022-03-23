import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import { HelmetProvider } from 'react-helmet-async'; //메타태그를 위한 라이브러리

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <App />   
    </HelmetProvider>    
  </Provider>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
