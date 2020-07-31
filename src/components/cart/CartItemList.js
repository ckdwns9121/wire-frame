import React, { useEffect, useState } from 'react';
import CartItem from 'components/cart/CartItem';

const initCarts = [
    {
        id: 1,
        menuName: "과일도시락",
        menuOption: "딸기추가 (1000)원, 토마토추가 (1000)원",
        menuCount: "5",
        menuPrice: "23000원",
        isCheked: false,
    },
    {
        id: 2,
        menuName: "그냥도시락",
        menuOption: "딸기추가 (500)원, 토마토추가 (1000)원",
        menuCount: "3",
        menuPrice: "33000원",
        isCheked: false,
    },

];

const CartItemList = ({ allChecked }) => {

    useEffect(() => {
        console.log("전체선택 바뀜");
    }, [allChecked]);
    
    const list = initCarts.map(cart =>(
        <CartItem 
        key = {cart.id}
        allChecked={allChecked}
        menuName={cart.menuName} 
        menuOption={cart.menuOption}
        menuCount={cart.menuCount}
        menuPrice={cart.menuPrice}
        isCheked={cart.isCheked}
        />
    ))

    return (
        <div>
            {list}
        </div>
    )
}

export default React.memo(CartItemList);