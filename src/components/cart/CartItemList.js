import React from 'react';
import CartItem from 'components/cart/CartItem';


const CartItemList = (props) => {

    const list = props.carts.map(cart =>(
        <CartItem {...cart} handleCheckChild={props.handleCheckChild} />
    ));
    return (
        <div>
            {list}
        </div>
    )
}

export default React.memo(CartItemList);