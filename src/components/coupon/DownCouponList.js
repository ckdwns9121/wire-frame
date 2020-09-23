import React from 'react';
import styles from './DownCoupon.module.scss';
import DownCouponItem from './DownCouponItem';


const initMenu = [
    {
        id: 1,
        cp_id: '첫 주문 3,000원 할인 쿠폰',
        cp_datetime: '2020-09-03 07:52',
        cp_price: 12345678900,
        cp_subject: '첫 주문시 사용가능',
    },
    {
        id: 2,
        cp_id: '첫 주문 3,000원 할인 쿠폰',
        cp_datetime: '2020-09-03 07:52',
        cp_price: 12345678900,
        cp_subject: '첫 주문시 사용가능',
    },
    {
        id: 3,
        cp_id: '첫 주문 3,000원 할인 쿠폰',
        cp_datetime: '2020-09-03 07:52',
        cp_price: 12345678900,
        cp_subject: '첫 주문시 사용가능',
    },
    {
        id: 4,
        cp_id: '첫 주문 3,000원 할인 쿠폰',
        cp_datetime: '2020-09-03 07:52',
        cp_price: 12345678900,
        cp_subject: '첫 주문시 사용가능',
    },
];


const DownCouponItemList = ({cp_list, check }) => {
    const list = cp_list.map((cp) => (
        <DownCouponItem key={cp.cz_id} item={cp} check={check} />
    ));

    return (<div className={styles['downcoupon-list']}>{list}</div>);
};

export default DownCouponItemList;
