import React from 'react';
import styles from './Coupon.module.scss';
import CouponItem from './CouponItem';

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

const CouponItemList = ({ cp_list, check }) => {
    const list = initMenu.map((cp) => (
        <CouponItem key={cp.id} item={cp} check={check} />
    ));

    return (
        <div className={styles['coupon-list']}>
            <div className={styles['tr']}>
                <TD text={'쿠폰명'} />
                <TD text={'할인금액'} />
                <TD text={'사용조건'} />
                <TD text={'기간'} />
            </div>
            {list}
        </div>
    );
};

function TD({ text }) {
    return <div className={styles['td']}>{text}</div>;
}

export default CouponItemList;
