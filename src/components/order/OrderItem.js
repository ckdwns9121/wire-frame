import React from 'react';
import styles from './Order.module.scss';
import cn from 'classnames/bind';
import menu1 from '../svg/order/menu1.png';

const cx = cn.bind(styles);

const OrderItem = (props) => {
    return (
        <div className={cx('order-item', { space: props.center })}>
            <div className={styles['menu-img']}>
                <img src={menu1} alt="menu" />
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['name']}>과일도시락</div>
                <div className={styles['options']}>
                    <span className={styles['medium']}>추가선택:</span> 딸기
                    추가(+1000원)/토마토 추가(+1000원)
                </div>
                <div className={styles['quanity']}>
                    수량: <span>10</span>
                </div>
                {!props.center && <div className={cx('price')}>32,000원</div>}
            </div>
            {props.center && <div className={cx('center-price')}>32,000원</div>}
        </div>
    );
};

OrderItem.defaultProps = {
    center: false,
};
export default OrderItem;
