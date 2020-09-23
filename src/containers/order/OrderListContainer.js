import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import PreviewOrderItem from '../../components/order/PreviewOrderItem';
import { ButtonBase } from '@material-ui/core';

//주문내역 페이지
const OrderListContainer = () => {
    const history = useHistory();

    const onClickOrderItem = () => {
        console.log('gd');
        history.push(`${Paths.ajoonamu.mypage}/order_detail?order_id=1234`);
    };

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>주문내역</div>
            </div>
            <div className={styles['select-date']}>
                <div className={styles['date']}>
                    <ButtonBase className={styles['date-box']}>1주일</ButtonBase>
                    <ButtonBase className={styles['date-box']}>1개월</ButtonBase>
                    <ButtonBase className={styles['date-box']}>3개월</ButtonBase>
                    <ButtonBase className={styles['date-box']}>6개월</ButtonBase>
                </div>
                <div className={styles['date-input-box']}>
                    <div className={styles['text']}>기간 입력</div>
                    <div className={styles['input']}>
                        <input />
                    </div>
                    <div className={styles['line']} />
                    <div className={styles['input']}>
                        <input />
                    </div>
                    <ButtonBase className={styles['btn']}>조회</ButtonBase>
                </div>
            </div>
            <div className={styles['order-list']}>
                <PreviewOrderItem onClick={onClickOrderItem} />
                <PreviewOrderItem onClick={onClickOrderItem} />
            </div>
        </div>
    );
};
export default OrderListContainer;
