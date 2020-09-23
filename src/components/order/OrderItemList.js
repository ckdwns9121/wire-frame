import React from 'react';
import OrderItem from './OrderItem';

const OrderItemList =({items})=>{
    console.log(items);
    const list  = items.map((item,index)=>(
        <OrderItem {...item} key={index}/>
    ))
    return(
        <>{list}</>
    )
}

export default OrderItemList;