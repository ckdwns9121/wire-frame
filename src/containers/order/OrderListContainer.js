import React from 'react';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import PreviewOrderItem from '../../components/order/PreviewOrderItem';

const tabInit = [
    {
        url: `${Paths.ajoonamu.order_list}/order?`,
        name: '예약주문',
    },
    {
        url: `${Paths.ajoonamu.order_list}/delivery`,
        name: '배달주문',
    },
];

//주문내역 페이지
const OrderListContainer = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>주문내역</div>
            </div>
            <div className={styles['select-date']}>
                <div className={styles['date']}>
                    <div className={styles['date-box']}>1주일</div>
                    <div className={styles['date-box']}>1개월</div>
                    <div className={styles['date-box']}>3개월</div>
                    <div className={styles['date-box']}>6개월</div>
                </div>
                <div className={styles['date-input-box']}>
                    <div className={styles['text']}>기간 입력</div>
                    <div className={styles['input']}>
                        <input></input>
                    </div>
                    <div className={styles['line']}></div>

                    <div className={styles['input']}>
                        <input></input>
                    </div>
                    <div className={styles['btn']}>조회</div>
                </div>
            </div>
            <div className={styles['order-list']}>
                <PreviewOrderItem/>
            </div>

        </div>
    );
};
export default OrderListContainer;
