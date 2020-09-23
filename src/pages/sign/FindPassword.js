import React from 'react';
import FindPasswordContainer from 'containers/sign/FindPasswordContainer';
import qs from 'qs';

const FindPassword = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const email = query.email;
    return <FindPasswordContainer email={email} />;
};

export default FindPassword;
