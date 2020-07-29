import React from 'react';
import {Paths} from 'paths';
import styles from './Cart.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import CartItem from 'components/cart/CartItem';

const CartContainer =()=>{

    return(
        <>
            <Header/>
            <Title mainTitle={"장바구니"} subTitle={"장바구니"}/>
            <div className={styles['cart-page']}>
                <div className={styles['bar']}> 
                    <div className={styles['all-check']}>
                    <input type="checkbox"></input><label>전체선택</label>
                    </div>
                    <div className={styles['select']}>
                        선택삭제
                    </div>
                </div>
                <div className={styles['cart-list']}>
                    <CartItem/>
                </div>

            </div>
        </>
    )
}
export default CartContainer;