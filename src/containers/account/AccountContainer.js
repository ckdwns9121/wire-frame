import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountContainer = () => {
    const { user } = useSelector(state => state.auth);

    console.log(user);
    useEffect(() => {

    }, [user]);

    return (
        <>
            <Header />
            <Title mainTitle={"내 정보 관리"} subTitle={"내 정보 관리"} location={"내집"} />
            <div className={styles['main']}>
                <div className={styles['pd-box']}>
                    <div className={cx('item','top-line','bottom-line')}>
                        <div className={cx('text')}>
                            이름
                        </div>
                        <div className={styles['value']}>
                            <SignNormalInput initValue={user ? user.name : ""} />
                        </div>
                    </div>
                    <div className={cx('item','bottom-line')}>
                        <div className={styles['text']}>
                            이메일
                        </div>
                        <div className={styles['value']}>
                            {user ? user.email : ""}
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                            비밀번호
                        </div>
                        <div className={styles['value']}>
                            <button>변경하기</button>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            변경할 비밀번호
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <SignNormalInput />
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <SignNormalInput />
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['compare']}>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    </div>
                    <div className={cx('item','bottom-line')}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['value-pd-box']}>
                                <button>취소</button>
                                <button>확인</button>
                            </div>

                        </div>
                    </div>


                    <div className={styles['item']}>
                        <div className={styles['text']}>
                            휴대폰 번호
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['value-pd-box']}>
                                {user ? user.hp : ""}<button>변경하기</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['value-pd-box']}>
                                변경할 휴대폰번호
                            </div>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <SignAuthInput buttonTitle={"인증번호발송"} />
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <SignAuthInput buttonTitle={"인증하기"} />
                        </div>
                    </div>
                    <div className={cx('item','bottom-line')}>
                        <div className={styles['text']}>
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['value-pd-box']}>
                                <button>취소</button>
                                <button>확인</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item','bottom-line')}>
                        <div className={styles['text']}>
                            알림설정
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['value-pd-box']}>
                                <input type="checkbox" />SMS
                            </div>
                        </div>
                    </div>
                    <div className={styles['test']}>
                        <div className={styles['bar']}>
                           <div className={styles['btn']}>
                               회원탈퇴 
                           </div>
                         </div>    
                         <div className={styles['box']}>
                            <div className={cx('btn','large')}>
                                 내정보수정
                            </div>
                         </div>            
                    </div>


                </div>
            </div>
        </>
    )
}

export default AccountContainer;