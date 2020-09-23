import React, { useState } from 'react';
import { Paths } from 'paths';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import CircleCheckBox from '../../components/checkbox/CircleCheckBox';
import SquareCheckBox from '../../components/checkbox/SquareCheckBox';
import Button from '../../components/button/Button';
import CheckBox from '../../components/checkbox/CheckBox';
import { ButtonBase } from '@material-ui/core';
const cx = classNames.bind(styles);

const OrderContainer = () => {
    //모달창 상태
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);

    //맞춤 주문 설정하기 버튼 클릭
    const onClickCustomOrder = () => {
        setOpen(true);
    };

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['title']}>주문하기</div>
                    <div className={styles['delivery-info-box']}>
                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>배달정보</div>
                            <div className={styles['user-info']}>
                                <div className={styles['name']}>김샌달</div>
                                <div className={styles['addr']}>
                                    서울특별시 구로구 구로동 557, 101동
                                    101호(샌달아파트)
                                </div>
                                <div className={styles['hp']}>
                                    <div className={styles['first']}>
                                        <select name="phone">
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="019">019</option>
                                        </select>
                                    </div>
                                    <div className={styles['second']}>
                                        <input
                                            className={styles['sub-number']}
                                            placeholder="핸드폰 앞자리"
                                        ></input>
                                    </div>
                                    <div className={styles['second']}>
                                        <input
                                            className={styles['sub-number']}
                                            placeholder="핸드폰 뒷자리"
                                        ></input>
                                    </div>
                                </div>
                                <div className={styles['input-hp']}>
                                    <CircleCheckBox text={'연락처 추가'} />
                                </div>
                            </div>
                        </div>

                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>
                                배달 요청 시간
                            </div>
                            <div className={styles['user-info']}>
                                <div className={styles['date']}>
                                    <div className={styles['first']}>
                                        <select name="date">
                                            <option value="2000">
                                                2000-00-00
                                            </option>
                                            <option value="2001">
                                                2000-00-00
                                            </option>
                                            <option value="2002">
                                                2000-00-00
                                            </option>
                                            <option value="2003">
                                                2000-00-00
                                            </option>
                                        </select>
                                    </div>
                                    <div className={styles['second']}>
                                        <select name="hours">
                                            <option value="9">오전 9시</option>
                                            <option value="10">오전 10시</option>
                                            <option value="11">오전 11시</option>
                                            <option value="12">오전 12시</option>
                                        </select>
                                    </div>
                                    <div className={styles['second']}>
                                        <select name="minute">
                                            <option value="00">00분</option>
                                            <option value="10">10분</option>
                                            <option value="20">20분</option>
                                            <option value="30">30분</option>
                                            <option value="40">40분</option>
                                            <option value="50">50분</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>요청사항</div>
                            <div className={styles['user-info']}>
                                <div className={styles['order-memo']}>
                                    <div className={styles['item']}>
                                        <div className={styles['bar']}>
                                            <div className={styles['text']}>
                                                주문요청 사항
                                            </div>
                                            <div
                                                className={styles['check-box']}
                                            >
                                                <SquareCheckBox
                                                    text={'자동저장'}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles['memo-input']}>
                                            <input
                                                className={styles['input']}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className={styles['item']}>
                                        <div className={styles['bar']}>
                                            <div className={styles['text']}>
                                                배달요청 사항
                                            </div>
                                            <div
                                                className={styles['check-box']}
                                            >
                                                <SquareCheckBox
                                                    text={'자동저장'}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles['memo-input']}>
                                            <input
                                                className={styles['input']}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>결제방법</div>
                            <div className={styles['user-info']}>
                                <div className={styles['payments']}>
                                    <Payment
                                        text={'신용/체크카드 결제'}
                                        check={true}
                                    />
                                    <Payment
                                        text={'가상계좌 결제'}
                                        check={false}
                                    />
                                    <Payment
                                        text={'휴대폰 결제'}
                                        check={false}
                                    />
                                    <Payment
                                        text={'만나서 직접 결제'}
                                        check={false}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>
                                할인쿠폰 적용
                            </div>
                            <div className={styles['user-info']}>
                                <div className={styles['coupon']}>
                                    <select name="coupon">
                                        <option value="cp1">
                                            적용할 쿠폰을 선택해주세요.
                                        </option>
                                        <option value="cp2">
                                            ABCD-EFGE-ABCD-EFGE
                                        </option>
                                        <option value="cp3">
                                            ABCD-EFGE-ABCD-EFGE
                                        </option>
                                        <option value="cp4">
                                            ABCD-EFGE-ABCD-EFGE
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles['info-box']}>
                            <div className={styles['sub-title']}>
                                포인트 사용
                            </div>
                            <div className={styles['user-info']}>
                                <div className={styles['point']}>
                                    <div className={styles['text']}>
                                        사용할 포인트
                                    </div>
                                    <input className={styles['point-input']} />
                                    <ButtonBase className={styles['btn']}>
                                        사용하기
                                    </ButtonBase>
                                </div>
                                <div className={styles['user-point']}>
                                    보유포인트 <span>5,000P</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['order-info-box']}>
                        <div className={styles['order-box-item']}>
                            <div className={styles['title']}>결제 정보</div>
                            <div className={styles['order-price']}>
                                <div className={styles['text-price']}>
                                    <div className={styles['text']}>
                                        주문금액
                                    </div>
                                    <div className={styles['price']}>
                                        10,000원
                                    </div>
                                </div>
                                <div className={styles['text-price']}>
                                    <div className={styles['text']}>
                                        배달비용
                                    </div>
                                    <div className={styles['price']}>
                                        4,000원
                                    </div>
                                </div>
                                <div className={styles['text-price']}>
                                    <div className={styles['text']}>
                                        쿠폰할인
                                    </div>
                                    <div className={styles['price']}>
                                        -3,000원
                                    </div>
                                </div>
                                <div className={styles['text-price']}>
                                    <div className={styles['text']}>
                                        포인트사용
                                    </div>
                                    <div className={styles['price']}>
                                        -1,000원
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['total-price']}>
                            <div className={styles['text']}>합계</div>
                            <div className={styles['price']}>100,000</div>
                            <span>원</span>
                        </div>
                        <div className={styles['order-btn']}>
                            <Button
                                title={'결제하기'}
                                disable={true}
                                toggle={true}
                            ></Button>
                        </div>
                        <div className={styles['agree-order']}>
                            <AcceptContainer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function Payment({ text, onClick, check }) {
    return (
        <ButtonBase className={cx('payment-item', { check: check })} onClick={onClick}>
            {text}
        </ButtonBase>
    );
}

const AcceptContainer = (props) => {
    return (
        <div className={cx('agree')}>
            <div className={styles['terms']}>
                <div className={styles['all']}>
                    <CheckBox
                        id={'all'}
                        text={'모두 동의합니다.'}
                        check={props.allCheck}
                        onChange={props.updateAllCheck}
                    />
                </div>
                <div className={cx('pd-sub-top')}>
                    <div className={styles['chk-box']}>
                        <CheckBox
                            id={'check1'}
                            text={'개인정보처리방침 필수 동의'}
                            check={props.check1}
                            onChange={props.onChangeCheck1}
                            url={Paths.index}
                        />
                    </div>
                    <div className={styles['chk-box']}>
                        <CheckBox
                            id={'check2'}
                            text={'이용약관 필수'}
                            check={props.check2}
                            onChange={props.onChangeCheck2}
                            url={Paths.index}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderContainer;
