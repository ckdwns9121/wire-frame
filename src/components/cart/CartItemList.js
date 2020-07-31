import React,{useEffect,useState} from 'react';
import CartItem from 'components/cart/CartItem';

const CartItemList =({allChecked,initCheck})=>{
    useEffect(()=>{
        console.log("전체선택 바뀜");
    },[allChecked])

    return(
            <div>
                    <CartItem allChecked={allChecked} initCheck={initCheck}/>
                    <CartItem allChecked={allChecked} initCheck={initCheck}/>
            </div>
    )
}

export default CartItemList;