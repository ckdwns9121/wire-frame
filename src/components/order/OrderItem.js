import React from 'react';
import styles from './Order.module.scss';
import menu1 from '../svg/order/menu1.png';

const OrderItem = () => {
    return (
        <div className={styles['order-item']}>
            <div className={styles['menu-img']}>
                <img src={menu1} alt="menu" />
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['name']}>과일도시락</div>
                <div className={styles['options']}>
                    <span className={styles['medium']}>추가선택:</span> 딸기 추가(+1000원)/토마토 추가(+1000원)
                </div>
                <div className={styles['quanity']}>
                    수량: <span>10</span>
                </div>
                <div className={styles['price']}>32,000원</div>
            </div>
        </div>
    );
};

export default OrderItem;
