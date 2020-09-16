import React,{useState} from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import SignAuthInput from 'components/sign/SignAuthInput';
import SignNormalInput from 'components/sign/SignNormalInput';
import DatePicker from 'components/modal/DatePicker';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const cx =classNames.bind(styles);

const OrderContainer = () => {
    //모달창 상태
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);


    //맞춤 주문 설정하기 버튼 클릭
    const onClickCustomOrder = () => {
        setOpen(true);
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Title mainTitle={"장바구니>주문하기"} subTitle={"주문하기"} />
            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    <div className={styles['title']}>
                        배달정보
                    </div>
                    <div className={styles['table']}>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                기본주소
                        </div>
                            <div className={styles['value']}>
                                서울시 구로구
                       </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                상세주소
                        </div>
                            <div className={styles['value']}>
                                <SignNormalInput />
                            </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                휴대폰 번호
                        </div>
                            <div className={styles['value']}>
                                <SignAuthInput buttonTitle={"인증번호 발송"} />
                            </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>

                            </div>
                            <div className={styles['value']}>
                                <SignAuthInput buttonTitle={"인증번호 하기"} />

                            </div>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        배달요청 시간
                    </div>
                    <div className={styles['table']}>
                        <div className={styles['date-picker']}>
                            <DatePicker />
                        </div>
                    </div>
                    <div className={styles['title']}>
                        요청사항
                    </div>
                    <div className={styles['table']}>
                        <div className={cx('space-between','text-value')}>
                            <div className={styles['memo-title']}>
                                주문 요청사항
                            </div>
                            <div className={styles['save']}>
                                <label><input type="checkbox"></input> 자동저장</label>
                            </div>
                        </div>
                        <div className={styles['memo']}>
                            <input></input>
                        </div>
                        <div className={cx('space-between','text-value')}>
                            <div className={styles['memo-title']}>
                                배달 요청사항
                            </div>
                            <div className={styles['save']}>
                                <label><input type="checkbox"></input> 자동저장</label>
                            </div>
                        </div>
                        <div className={styles['memo']}>
                            <input></input>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        결제방법
                    </div>
                    <div className={styles['table']}>
                        <div className={styles['payment']}>
                            <div className={styles['item']}>
                                신용카드/체크카드 결제
                                </div>
                            <div className={styles['item']}>
                                가상계좌 결제
                                </div>
                        </div>
                        <div className={styles['payment']}>
                            <div className={styles['item']}>
                                휴대폰 결제
                                </div>
                            <div className={styles['item']}>
                                만나서 직접 결제
                                </div>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        할인쿠폰
                    </div>
                    <div className={styles['table']}>
                        <form>
                            <select>
                                <option value="reserve">적용할 쿠폰을 선택해주세요</option>
                                <option value="delivery">배달주문</option>
                            </select>
                        </form>
                    </div>
                    <div className={styles['title']}>
                        포인트 사용
                    </div>
                    <div className={styles['table']}>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                보유 포인트
                        </div>
                            <div className={styles['value']}>
                                5000P
                       </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                사용할 포인트
                        </div>
                            <div className={styles['value']}>
                                <input></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles['title']}>
                        결제금액
                    </div>
                    <div className={styles['table']}>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                주문 금액
                        </div>
                            <div className={styles['value']}>
                                5000P
                       </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                배달비용
                        </div>
                            <div className={styles['value']}>
                                4000원
                       </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                쿠폰할인
                        </div>
                            <div className={styles['value']}>
                                1000원
                       </div>
                        </div>
                        <div className={styles['text-value']}>
                            <div className={styles['text']}>
                                포인트사용
                        </div>
                            <div className={styles['value']}>
                                1000원
                       </div>
                        </div>
                    </div>
                    <div className={styles['table']}>
                        <div className={cx('space-between','text-value')}>
                            <div className={styles['memo-title']}>
                                총 결제금액
                            </div>
                            <div className={styles['save']}>
                                300000원
                            </div>
                        </div>
                        <AcceptContainer/>
                    </div>
                </div>
            </div>
        </>
    )
}



function AcceptContainer() {
    const [allCheck, setAllCheck] = useState(false);
    const onChangeCheck = (e) => {
        setAllCheck(!allCheck);
        console.log(allCheck);
    }
    return (
        <div className={styles['agree']}>
            <div className={styles['item']}>
                <div className={styles['sub']}>
                    <input type="checkbox" checked={allCheck} onClick={onChangeCheck} />
                    <label>모두 동의합니다</label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-title']}>
                    <input type="checkbox" />
                    <label>개인정보처리방침 필수 동의</label>
                </div>
                <div className={styles['sub-title']}>
                    <label>보기 </label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-title']}>
                    <input type="checkbox" />
                    <label>이용약관 필수 동의</label>
                </div>
                <div className={styles['sub-title']}>
                    <label>보기 </label>
                </div>
            </div>
            <div className={styles['item']}>
                <div className={styles['sub-title']}>
                    <input type="checkbox" />
                    <label>구매에 동의하십니까?</label>
                </div>
            </div>
        </div>
    )
}


export default OrderContainer;