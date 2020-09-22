import React from 'react';
import SignCompleteContainer from 'containers/sign/SignCompleteContainer';

const SignupComplete = ({ match }) => (
    <SignCompleteContainer name={match.params.name} />
);

export default SignupComplete;
