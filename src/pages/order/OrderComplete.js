import React from 'react';
import OrderCompleteContainer from '../../containers/order/OrderCompleteContainer';
import qs from 'qs';

const OrderComplete = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { order_number } = query;

    return (
        <OrderCompleteContainer order_number={order_number}/>
    )
}

export default OrderComplete;