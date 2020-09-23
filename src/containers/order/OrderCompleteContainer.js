import React, { useCallback, useState } from 'react';
import OrderItem from '../../components/order/OrderItem';
import styles from './OrderComplete.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import StickerModal from '../../components/modal/StickerModal';
const cx = cn.bind(styles);
const str = (
    <>
        이창훈 님 저희 아주나무 딜리버리 서비스를 이용해주셔서 감사합니다.
        <br />
        아래 주문상세내역서는 주문내역에서 다시 확인 가능합니다.
        <br />
        (비회원 주문시 주문내역을 확인이 어려울 수 있습니다.)
    </>
);

const OrderCompleteContainer = ({order_number}) => {

 

    const [modalOpen, setModalOpen] = useState(false);
    
    const handleOpen = useCallback(() => setModalOpen(true), []);
    const handleClose = useCallback(() => setModalOpen(false), []);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['message']}>
                        <div className={styles['title']}>
                            주문이 완료되었습니다.
                        </div>
                        <div className={styles['msg']}>{str}</div>
                        <div className={styles['order-number']}>
                            주문번호 : {order_number}
                        </div>
                        <div className={styles['btn']}>
                            <ButtonBase onClick={handleOpen} className={styles['item']}>문구서비스 신청</ButtonBase>
                        </div>
                    </div>
                </div>
                <div className={styles['view-content']}>
                    <div className={styles['order-view']}>
                        <div className={styles['title']}>주문 상세 내역</div>
                        <div className={styles['order-list']}>
                            {/* <OrderItem />
                            <OrderItem /> */}
                        </div>
                    </div>
                    <div className={styles['payment-view']}>
                        <div className={styles['title']}>결제 내역</div>
                        <div className={styles['box']}>
                            <OrderInfoBox text={'주문번호'} value={'00054544547'} />
                            <OrderInfoBox
                                text={'주문일시'}
                                value={'2019-11-12 16:44:22'}
                            />
                            <OrderInfoBox
                                text={'결제방식'}
                                value={'가상계좌 입금'}
                            />
                            <OrderInfoBox text={'결제금액'} value={'101,000원'} />
                            <OrderInfoBox text={'입금자명'} value={'이창훈'} />
                            <OrderInfoBox text={'입금계좌'} value={'국민은행'} paddingBottom={'10px'} />
                            <OrderInfoBox text={''} value={'574845-23-568521 김종완'} />
                            <OrderInfoBox
                                text={'가상계좌 유효기간'}
                                auto={true}
                                value={'2020년 06월 09일 00시 00분 00초'}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles['user-content']}>
                    <div className={styles['user-info']}>
                        <div className={styles['title']}>배달정보</div>
                        <div className={styles['context']}>
                            <UserInfoBox text={'받는분'} value={'이창훈'} />
                            <UserInfoBox text={'연락처'} value={'010-8885-7406'} />
                            <UserInfoBox
                                text={'배달 요청 시간'}
                                value={'2020년 05월 17일 오전 9시 30분'}
                            />
                            <UserInfoBox
                                text={'배달 주소'}
                                value={'서울특별시 구로구 구로동 557, 2층'}
                            />
                            <UserInfoBox
                                text={'요청 사항'}
                                value={'빨리 배달 해주세요~~'}
                            />
                        </div>
                    </div>
                    <div className={styles['user-info']}>
                        <div className={styles['title']}>주문정보</div>
                        <div className={styles['context']}>
                            <UserInfoBox text={'주문자'} value={'김종완'} />
                            <UserInfoBox text={'연락처'} value={'010-8885-7406'} />
                            <UserInfoBox text={'이메일'} value={'dfd1123@naver.com'} />
                            <UserInfoBox text={'주문 종류'} value={'예약주문'} />
                            <UserInfoBox
                                text={'요청 사항'}
                                value={'빨리 배달 해주세요~~'}
                            />
                        </div>
                    </div>
                    <div className={styles['user-info']}>
                        <div className={styles['title']}>매장정보</div>
                        <div className={styles['context']}>
                            <UserInfoBox
                                text={'매장명'}
                                value={'아주나무 혜화점'}
                            />
                            <UserInfoBox
                                text={'매장주소'}
                                value={'서울특별시 구로구 구로동 557'}
                            />
                            <UserInfoBox text={'연락처'} value={'02-458-8888'} />
                        </div>
                    </div>

                    <div className={styles['order-cancle']}>
                        <ButtonBase className={styles['btn']}>주문취소하기</ButtonBase>
                    </div>
                </div>
            </div>
            <StickerModal
                open={modalOpen}
                handleClose={handleClose}
            />
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
