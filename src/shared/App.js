import React from "react";
import { ConnectedRouter } from 'connected-react-router';
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";


//page import
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  console.log(process.env.REACT_APP_SERVER_PORT );
  return ( 
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login}/>{/* 로그인 */}
        <Route path="/signup" exact component={Signup}/>{/* 회원가입 */}
      </ConnectedRouter>
    </>
  );
}

export default App;
