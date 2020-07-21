import React from 'react';
import {Signin,SignUp,SignupComplete,Recovery,RecoveryId,RecoveryPw} from 'pages';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/signin" component={Signin}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/complete/:name" component={SignupComplete}></Route>
      <Route path="/recovery" component={Recovery}></Route>
      <Route path="/recovery_id" component={RecoveryId}></Route>
      <Route path="/recovery_pw" component={RecoveryPw}></Route>
    </div>
  );
}

export default App;
