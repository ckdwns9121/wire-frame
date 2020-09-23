import React from 'react';
import OrderItem from '../../components/order/OrderItem';
import styles from './OrderDetail.module.scss';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

const OrderDetailContainer = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['detail-box']}>
                    <div className={styles['title']}>주문 상세 보기</div>
                    <div className={styles['preview-title-bar']}>
                        <div className={styles['order-info']}>
                            <div className={styles['top']}>
                                <div className={styles['order-date']}>
                                    2020/06/01 13:30:10
                                </div>
                                <div className={styles['order-id']}>
                                    주문번호 : 54545475741
                                </div>
                                <div className={styles['order-type']}>
                                    배달완료
                                </div>
                            </div>
                            <div className={styles['bottom']}>
                                <div className={styles['req-date']}>
                                    배달 요청 시간 : 2020-06-02 09:30:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['detail-box']}>
                    <div className={styles['title']}>주문 상세 내역</div>
                    <div className={styles['order-detail-view']}>
                        <div className={styles['order-item-list']}>
                            <OrderItem center={true}></OrderItem>
                            <OrderItem center={true}></OrderItem>
                            <OrderItem center={true}></OrderItem>
                        </div>
                    </div>
                </div>
                <div className={styles['detail-box']}>
                    <div className={styles['title']}>배달 정보</div>
                    <div className={styles['order-detail-view']}>
                        <div className={styles['context']}>
                            <UserInfoBox text={'받는분'} value={'이창훈'} />
                            <UserInfoBox
                                text={'연락처'}
                                value={'010-8885-7406'}
                            />
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
                </div>
                <div className={styles['detail-box']}>
                    <div className={styles['title']}>주문 정보</div>
                    <div className={styles['order-detail-view']}>
                        <div className={styles['context']}>
                            <UserInfoBox text={'주문자'} value={'김종완'} />
                            <UserInfoBox
                                text={'연락처'}
                                value={'010-8885-7406'}
                            />
                            <UserInfoBox
                                text={'이메일'}
                                value={'dfd1123@naver.com'}
                            />
                            <UserInfoBox
                                text={'주문 종류'}
                                value={'예약주문'}
                            />
                            <UserInfoBox
                                text={'요청 사항'}
                                value={'빨리 배달 해주세요~~'}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles['detail-box']}>
                    <div className={styles['store-info']}>
                        <div className={styles['title']}>매장정보</div>
                        <div className={styles['order-detail-view']}>
                            <div className={styles['context']}>
                                <UserInfoBox text={'매장명'} value={'아주나무 혜화점'} />
                                <UserInfoBox
                                    text={'매장주소'}
                                    value={'서울특별시 구로구 구로동 557'}
                                />
                                <UserInfoBox
                                    text={'연락처'}
                                    value={'02-458-8888'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['order-info']}>
                        <div className={styles['title']}>결제 금액</div>
                        <div className={styles['order-detail-view']}>
                            <div className={styles['order-box']}>
                            <OrderInfoBox text={'주문금액'} value={'10,000'} />
                            <OrderInfoBox text={'배달비용'} value={'4,000'} />
                            <OrderInfoBox text={'쿠폰할인'} value={'-3,000'} />
                            <OrderInfoBox
                                text={'포인트사용'}
                                value={'-1,000'}
                            />
                            </div>
                     
                            <div className={styles['total']}>
                                <div className={styles['box']}>
                                <div className={styles['text']}>합계</div>
                                <div className={styles['value']}>
                                    100,000<span>원</span>
                                </div>
                                </div>
                                <div className={cx('box','card')}>
                                <div className={styles['text']}>신용카드</div>
                                <div className={styles['value']}>
                                하나카드
                                </div>
                                </div>
                                <div className={cx('box','card-type')}>
                                <div className={styles['text']}></div>
                                <div className={styles['value']}>
                                1234-5678-****-**** 일시불
                                </div>
                                </div>
                    
                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function UserInfoBox({ text, value }) {
    return (
        <div className={styles['box']}>
            <div className={styles['text']}>{text}</div>
            <div className={styles['value']}>{value}</div>
        </div>
    );
}

function OrderInfoBox({ text, value }) {
    return (
        <div className={styles['order-item']}>
            <div className={styles['text']}>{text}</div>
            <div className={styles['value']}>
                {value}
                <span>원</span>
            </div>
        </div>
    );
}

export default OrderDetailContainer;
