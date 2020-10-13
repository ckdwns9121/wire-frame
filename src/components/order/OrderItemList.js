import React from 'react';
import OrderItem from './OrderItem';

const OrderItemList = ({ items, center }) => {
    const list = items.map((item, index) => (
        <OrderItem {...item} key={index} center={center} />
    ));
    return <>{list}</>;
};

export default OrderItemList;
