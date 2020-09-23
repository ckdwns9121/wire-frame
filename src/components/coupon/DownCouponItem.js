import React from 'react';
import styles from './DownCoupon.module.scss';
import DownCoupon from 'components/svg/coupon/down.svg';
import { numberFormat } from '../../lib/formatter';

const DownCouponItem = (props) => {
    const {
        cp_id,
        cz_datetime,
        cz_download,
        cz_end,
        cz_id,
        cz_limit,
        cz_minimum,
        cz_period,
        cz_price,
        cz_start,
        cz_subject,
        cz_target,
    } = props.item;
    return (
        <div className={styles['coupon-item']}>
            <div className={styles['down']}>
                <CouponDown check={true} />
            </div>
            <div className={styles['info']}>
                <div className={styles['pd-box']}>
                    <CouponEventName event_name={`첫 주문 ${numberFormat(cz_price)} 원 할인 쿠폰`} />
                    <CouponSale sale={cz_price} />
                    <CouponEventSub sub_name={cz_subject} />
                    <CouponDate date={cz_datetime} />
                </div>
            </div>
        </div>
    );
};
function CouponEventName({ event_name }) {
    return (<div className={styles['event-name']}>{event_name}</div>);
}
function CouponSale({ sale }) {
    return (<div className={styles['sale']}>{numberFormat(sale)}원 할인</div>);
}
function CouponEventSub({ sub_name }) {
    return (<div className={styles['sub-name']}>{sub_name}</div>);
}
function CouponDate({ date }) {
    return (<div className={styles['date']}>{date}</div>);
}
function CouponDown({ check }) {
    return (<>{check && <img src={DownCoupon} alt="다운" />}</>);
}

export default DownCouponItem;
