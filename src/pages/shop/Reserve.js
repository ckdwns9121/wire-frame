import React from 'react';
import ReserveContainer from '../../containers/shop/ReserveContainer';
import qs from 'qs';
function Reserve({ location }) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    console.log("상점 샵");
    console.log(query);
    let tab = query.tab;
    if (tab === undefined) {
        tab = '1';
    }
    return (<ReserveContainer tab={parseInt(tab)} />);
}
export default Reserve;
