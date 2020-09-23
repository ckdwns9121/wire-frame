import React from 'react';
import styles from './Coupon.module.scss';
import DownCoupon from '../svg/coupon/down.svg';
// import { numberFormat } from "../../lib/formatter";

const CouponItem = (props) => {
    const {
        cp_datetime,
        // cp_end,
        cp_id,
        // cp_minimum,
        cp_price,
        // cp_start,
        cp_subject,
        // cp_target,
        // cp_use,
        // cp_use_date,
        // cz_id,
        // user_id,
    } = props.item;
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['info']}>
                <CouponEventName event_name={cp_id} />
                <CouponSale sale={cp_price} />
                <CouponEventSub sub_name={cp_subject} />
                <CouponDate date={cp_datetime} />
            </div>
        </div>
    );
};
function CouponEventName({ event_name }) {
    return <div className={styles['event-name']}>{event_name}</div>;
}
function CouponSale({ sale }) {
    return <div className={styles['sale']}>{sale}</div>;
}
function CouponEventSub({ sub_name }) {
    return <div className={styles['sub-name']}>{sub_name}</div>;
}
function CouponDate({ date }) {
    return <div className={styles['date']}>{date}</div>;
}
export default CouponItem;
