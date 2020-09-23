import React from 'react';
import styles from './Order.module.scss';
import cn from 'classnames/bind';
import menu1 from '../svg/order/menu1.png';
import {numberFormat} from '../../lib/formatter';
const cx = cn.bind(styles);

const OrderItem = (props) => {

    console.log(props);
    const {
        center,
        item_name,
        item_option,
        item_price,
    } = props;

    return (
        <div className={cx('order-item', { space: center })}>
            <div className={styles['menu-img']}>
                <img src={menu1} alt="menu" />
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['name']}>과일도시락</div>
                <div className={styles['options']}>
                    <span className={styles['medium']}>추가선택: </span> 
                     {item_option ? item_option : '없음'}
                </div>
                <div className={styles['quanity']}>
                    수량: <span>1</span>
                </div>
                {!props.center && <div className={cx('price')}>{numberFormat(item_price)}원</div>}
            </div>
            {props.center && <div className={cx('center-price')}>{numberFormat(item_price)}원</div>}
        </div>
    );
};

OrderItem.defaultProps = {
    center: false,
};
export default OrderItem;
