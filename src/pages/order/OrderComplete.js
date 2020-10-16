import React, { useEffect } from 'react';
import OrderCompleteContainer from '../../containers/order/OrderCompleteContainer';
import qs from 'qs';
import { PROTOCOL_ENV } from '../../paths';

const OrderComplete = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { order_number, message } = query;

    const isMobile = () => {
        var UserAgent = navigator.userAgent;
        if (
            UserAgent.match(
                /iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
            ) != null ||
            UserAgent.match(/LG|SAMSUNG|Samsung/) != null
        ) {
            return true;
        }
    }

    useEffect(() => {
        if (message.indexOf('취소')) {
            if (isMobile()) {
                window.location = PROTOCOL_ENV + 'm.ajoonamu.com/order';
            } else {
                window.location = PROTOCOL_ENV + 'ajoonamu.com/order';
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <OrderCompleteContainer order_number={order_number}/>
    )
}

export default OrderComplete;