import React from 'react';
import LoginContainer from './containers/signin/LoginContainer';
import SignupContainer from './containers/signup/SignupContainer';
import SignupSuceess from './containers/signup/SignupSuccess';
import FindLink from './containers/find/FindLink';
import FindUserId from './containers/find/FindUserId';
import ShowUserId from './containers/find/ShowUserId';


function App() {
  return (
    <div className="App">
      <LoginContainer/>
      <SignupContainer/>
      <SignupSuceess/>
      <FindLink/>/
      <FindUserId/>
      <ShowUserId/>
    </div>
  );
}

export default App;
