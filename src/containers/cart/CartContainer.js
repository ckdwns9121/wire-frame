import React from 'react';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import CartItem from 'components/cart/CartItem';

const CartContainer = () => {

    return (
        <>
            <Header />
            <Title mainTitle={"장바구니"} subTitle={"장바구니"} />
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
                    <CartItem />
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                총 주문금액
                        </div>
                            <div className={styles['price']}>
                                30000
                        </div>
                        </div>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                배달비
                        </div>
                            <div className={styles['price']}>
                                3000
                        </div>
                        </div>
                        <div className={styles['order-text']}>
                            * 배달비는 거리에 따라 측정되며, 20만원 이상 결제시 배달비는 무료입니다.
                        </div>
                        <div className={styles['estm']}>
                            <div className={styles['title']}>
                                견적서 발송 여부
                        </div>
                            <div className={styles['check']}>
                                <input type="checkbox"></input> 견적서 받음
                                <input type="checkbox"></input> 견적서 안받음
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
export default CartContainer;