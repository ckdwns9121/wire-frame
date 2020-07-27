import React from 'react';
import {Signin,SignUp,SignupComplete,Recovery,RecoveryId,RecoveryPw} from 'pages';
import {Home,Account,Address} from 'pages';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact={true}path="/" component={Home}></Route>
      <Route path="/signin" component={Signin}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/complete/:name" component={SignupComplete}></Route>
      <Route path="/recovery" component={Recovery}></Route>
      <Route path="/recovery_id" component={RecoveryId}></Route>
      <Route path="/recovery_pw" component={RecoveryPw}></Route>
      <Route path="/account" component={Account}></Route>
      <Route path="/address" component={Address} ></Route>
    </div>
  );
}

export default App;
