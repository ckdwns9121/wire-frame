import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import OrderItemList from '../../components/order/OrderItemList';
import styles from './OrderComplete.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import StickerModal from '../../components/modal/StickerModal';
import { getDetailOrderView } from '../../api/order/orderItem';
import {noAuthOrderView ,noAutuOrderCancle} from '../../api/noAuth/order';
import { useStore } from '../../hooks/useStore';
import Loading from '../../components/assets/Loading';
import { numberFormat, stringToTel } from '../../lib/formatter';
import { modalOpen } from '../../store/modal';
import { order_cancle } from '../../api/order/order';

const cx = cn.bind(styles);

const OrderCompleteContainer = ({ order_number }) => {
    const user_token = useStore(false);
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);

    const modalDispatch = useDispatch();

    const openMessage = useCallback(
        (isConfirm, title, text, handleClick = () => { }) => {
            modalDispatch(modalOpen(isConfirm, title, text, handleClick));
        },
        [modalDispatch],
    );

    const [stickyOpen, setStickyOpen] = useState(false); //문구 서비스 모달
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);
    const [payinfo, setPayInfo] = useState(null);
    const [payple_info, setPaypleInfo] = useState(null);

    const handleOpen = useCallback(() => setStickyOpen(true), []);
    const handleClose = useCallback(() => setStickyOpen(false), []);

    const getOrderInfo = useCallback(async () => {
        setLoading(true);
        try {
            let res = null;
            if (user_token) 
            {
                console.log('회원');
                res = await getDetailOrderView(user_token, order_number);
            } 
            else {
                console.log('비회원')
                res = await noAuthOrderView(order_number);
            }

            const {orders } = res;
            console.log(orders);
            setOrders(orders);
            setSuccess(true);
     
        } catch (e) {
            console.log(e);
            setError(true);
            openMessage(
                false,
                '주문번호가 존재하지 않습니다.',
                '주문번호를 확인해주세요',
                () => history.goBack(),
            );
        }
        setLoading(false);
    }, [order_number, user_token]);


    const userOrderCancle = async () => {
        openMessage(
            true,
            '해당 상품을 취소하시겠습니까?',
            '취소를 원하시면 예를 눌러주세요',
            async () => {
                try {
                    let res =null;
                    if(user_token){
                     res = await order_cancle(user_token, order_number);
                   }
                   else{
                    res = await noAutuOrderCancle(order_number,orders.info.s_hp);
                   }

                   if (res.data.msg.indexOf('이미 취소 된 거래건 입니다.')) 
                   {
                       openMessage(false, '이미 취소된 거래건 입니다.');
                   } 
                   else 
                   {
                       openMessage(false, '정삭적으로 취소되었습니다.');
                   }
             
                } 
                catch (e) {
                    console.error(e);
                }
            },
        );
    };
    

    useEffect(() => {
        if (!order_number) {
            history.replace('/');
        } else {
            getOrderInfo();
        }
    }, [order_number, getOrderInfo, history]);

    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                    <>
                        {success && (
                            <>
                                <div className={styles['container']}>
                                    <div className={styles['content']}>
                                        <div className={styles['message']}>
                                            <div className={styles['title']}>
                                                주문이 완료되었습니다.
                                            </div>
                                            <div className={styles['msg']}>
                                                <>
                                                    {user && `${user.name}님`}  저희 아주나무 딜리버리 서비스를 이용해주셔서 감사합니다.
                                                     <br />
                                                      아래 주문상세내역서는 주문내역에서 다시 확인 가능합니다.
                                                    <br />
                                                   (비회원 주문시 주문내역을 확인이 어려울 수 있습니다.)
                                                  </>
                                            </div>
                                            <div className={styles['order-number']}>
                                                주문번호 : {order_number}
                                            </div>
                                            <div className={styles['btn']}>
                                                <ButtonBase
                                                    onClick={handleOpen}
                                                    className={styles['item']}
                                                >
                                                    문구서비스 신청
                                                </ButtonBase>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['view-content']}>
                                        <div className={styles['order-view']}>
                                            <div className={styles['title']}>
                                                주문 상세 내역
                                        </div>
                                            <div className={styles['order-list']}>
                                                {orders && (
                                                    <OrderItemList
                                                        items={orders.items}
                                                        center={false}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles['payment-view']}>
                                            <div className={styles['title']}>
                                                결제 내역
                                        </div>
                                            <div className={styles['box']}>
                                                <OrderInfoBox
                                                    text={'주문번호'}
                                                    value={
                                                        orders && orders.order_id
                                                    }
                                                />
                                                <OrderInfoBox
                                                    text={'주문일시'}
                                                    value={
                                                        orders &&
                                                        orders.receipt_time
                                                    }
                                                />
                                                <OrderInfoBox
                                                    text={'결제방식'}
                                                    value={orders && orders.info.pg}
                                                />
                                                <OrderInfoBox
                                                    text={'결제금액'}
                                                    value={
                                                        orders &&
                                                        `${numberFormat(
                                                            orders.info.receipt_price,
                                                        )}원`
                                                    }
                                                />
                                                <OrderInfoBox
                                                    text={'입금자명'}
                                                    value={ user && user.name }
                                                />
                                                {/* <OrderInfoBox
                                                    text={'입금계좌'}
                                                    value={'국민은행'}
                                                    paddingBottom={'10px'}
                                                />
                                                <OrderInfoBox
                                                    text={''}
                                                    value={
                                                        '574845-23-568521 김종완'
                                                    }
                                                />
                                                <OrderInfoBox
                                                    text={'가상계좌 유효기간'}
                                                    auto={true}
                                                    value={
                                                        '2020년 06월 09일 00시 00분 00초'
                                                    }
                                                /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles['user-content']}>
                                        <div className={styles['user-info']}>
                                            <div className={styles['title']}>
                                                배달정보
                                        </div>
                                            <div className={styles['context']}>
                                                <UserInfoBox
                                                    text={'받는분'}
                                                    value={user && user.name}
                                                />
                                                <UserInfoBox
                                                    text={'연락처'}
                                                    value={user && user.hp ? stringToTel(user.hp) : orders && stringToTel(orders.info.s_hp) }
                                                />
                                                <UserInfoBox
                                                    text={'배달 요청 시간'}
                                                    value={
                                                        orders && orders.info.delivery_req_time
                                                    }
                                                />
                                                <UserInfoBox
                                                    text={'배달 주소'}
                                                    value={orders && `${orders.s_addr1} ${orders.s_addr2}`}
                                                />
                                                <UserInfoBox
                                                    text={'요청 사항'}
                                                    value={orders && orders.info.delivery_memo}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles['user-info']}>
                                            <div className={styles['title']}>
                                                주문정보
                                        </div>
                                            <div className={styles['context']}>
                                                <UserInfoBox
                                                    text={'주문자'}
                                                    value={user && user.name}
                                                />
                                                <UserInfoBox
                                                    text={'연락처'}
                                                    value={user && stringToTel(user.hp)}
                                                />
                                                <UserInfoBox
                                                    text={'이메일'}
                                                    value={user && user.email}
                                                />
                                                <UserInfoBox
                                                    text={'주문 종류'}
                                                    value={orders && orders.info.order_type ==='reserve' ? '배달주문' : '예약주문'}
                                                />
                                                <UserInfoBox
                                                    text={'요청 사항'}
                                                    value={orders && orders.info.order_memo}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles['user-info']}>
                                            <div className={styles['title']}>
                                                매장정보
                                        </div>
                                            <div className={styles['context']}>
                                                <UserInfoBox
                                                    text={'매장명'}
                                                    value={orders && orders.shop_name}
                                                />
                                                <UserInfoBox
                                                    text={'매장주소'}
                                                    value={
                                                        orders && `${orders.shop_addr1} ${orders.shop_addr2}`
                                                    }
                                                />
                                                <UserInfoBox
                                                    text={'연락처'}
                                                    value={orders && stringToTel(orders.shop_hp)}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles['order-cancle']}>
                                            <ButtonBase className={styles['btn']} onClick={
                                                orders && orders.info.od_status !=="order_cancel" ? userOrderCancle : ()=>{} }
                                                disableRipple ={!(orders && orders.info.od_status !=="order_cancel")}
                                                >
                                            {orders && orders.info.od_status ==="order_cancel" ? '주문취소 완료' :'주문취소'}
                                            </ButtonBase>
                                        </div>
                                    </div>
                                </div>
                                <StickerModal
                                    order_number={order_number}
                                    open={stickyOpen}
                                    handleClose={handleClose}
                                    token={user_token}
                                />
                            </>
                        )}
                    </>
                )}
        </>
    );
};

function OrderInfoBox({ text, value, auto, paddingBottom }) {
    return (
        <div className={styles['text-price']} style={{ paddingBottom }}>
            <div className={cx('text', { auto: auto })}>{text}</div>
            <div className={styles['price']}>{value}</div>
        </div>
    );
}

function UserInfoBox({ text, value }) {
    return (
        <div className={styles['box']}>
            <div className={styles['text']}>{text}</div>
            <div className={styles['value']}>{value}</div>
        </div>
    );
}

export default OrderCompleteContainer;
