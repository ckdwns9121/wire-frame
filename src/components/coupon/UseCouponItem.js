import React from 'react';
import styles from './Coupon.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

const UseCouponItem = () => {
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['info']}>
                <CouponEventName event_name={'첫 주문 3,000원 할인'} />
                <CouponSale sale={'3000'} />
                <CouponEventSub sub_name={'첫 주문시 사용가능'} />

                <CouponDate date={'2020-05-01 (목)'} />
            </div>
        </div>
    );
};

function CouponDate({ date }) {
    return (<div className={styles['date']}>{date}</div>);
}

function CouponEventName({ event_name }) {
    return (<div className={styles['event-name']}>{event_name}</div>);
}

function CouponEventSub({ sub_name }) {
    return (<div className={styles['sub-name']}>{sub_name}</div>);
}
function CouponSale({ sale }) {
    return (<div className={styles['sale']}>할인 금액 {sale}</div>);
}

export default UseCouponItem;
