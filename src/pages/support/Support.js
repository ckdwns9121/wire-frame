import React, { useEffect } from 'react';
import SupportContainer from '../../containers/support/SupportContainer';
import { Paths } from '../../paths';

const Support = ({ match, location, history }) => {

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            alert('로그인 후 이용하셔야 합니다.');
            history.replace(Paths.index);
        }
    }, [history]);

    const { pathname } = location;
    const selector = pathname.replace('/support', '');
    return (
        <SupportContainer pathname={selector !== '' ? selector : '/notice'} />
    );
};

export default Support;
