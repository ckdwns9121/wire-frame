import React from 'react';
import MypageContainer from '../../containers/mypage/MypageContainer';
import qs from 'qs';

const Mypage = ({ match, location }) => {
    const { pathname } = location;
    const selector = pathname.replace('/order_list', '');
    console.log(selector);
    console.log(pathname);
    console.log(location);

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const tab = query.tab;
    console.log(tab);
    return (
        <MypageContainer
            pathname={
                selector !== '/mypage'
                    ? pathname
                    : '/order_list'
            }
            tab={tab}
        />
    );
};

export default Mypage;
