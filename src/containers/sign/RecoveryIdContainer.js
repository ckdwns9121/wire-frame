import React, { useState ,useCallback} from 'react';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/coupon/Check';
import {requestPostMobileAuth, requestPostMobileAuthCheck} from '../../api/auth/auth';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../store/modal';

const cx = classNames.bind(styles);

const RecoveryIdContainer = () => {
    const modalDispatch = useDispatch();
    const openAlert = useCallback((title, text, handleClick = () => {}) => {
        modalDispatch(modalOpen(false, title, text, handleClick));
    }, [modalDispatch]);
    
    const [auth_start, setAuth] = useState(false);
    const [start_timer, setStartTimer] = useState(false);
    const [phoneAuth, setPhoneAuth] = useState(false); //인증번호 성공
    const [phoneNumber, setPhoneNumber] = useState('');

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');

    const onChangeId = (e) => {
        setUserName(e.target.value);
    };
    const onChangePhone = (e) => {
        setUserPhone(e.target.value);
    };
    const onChangeAuth = (e) => {
        setUserAuth(e.target.value);
    };

    //인증번호 발송
    const getMobileAuthNumber = async () => {
        const res = await requestPostMobileAuth(phoneNumber);
        if (res.data.msg === '실패!') {
            openAlert('인증번호 발송에 실패했습니다.', '잠시 후 다시 시도해 주세요!');
        } else {
            setStartTimer(true);
            setAuth(!auth_start);
            openAlert('인증번호가 성공적으로 발송되었습니다!', '인증번호를 확인 후 입력해 주세요!');
        }
    };

    
    //인증번호 재발송
    const onClickReSendAuth =()=>{
        setStartTimer(false);
        setTimeout(()=>setStartTimer(true),0);
    }

    const sendMobileAuthNumber = useCallback(async () => {
        const res = await requestPostMobileAuthCheck(userPhone, userAuth);
        if (res.data.msg === '성공!') {
            openAlert('성공적으로 인증되었습니다!', '회원가입 버튼을 누르세요!');
            setPhoneAuth(true);
        } else {
            openAlert('인증번호가 틀렸습니다!', '인증번호를 다시 한 번 확인해 주세요!');
        }
    }, [userPhone, userAuth, openAlert]);

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>아이디 찾기</div>
                <SignNormalInput
                    label={'이름'}
                    inputType={'text'}
                    initValue={userName}
                    onChange={onChangeId}
                />
                <div className={styles['divider']} />
                <SignAuthInput
                    label={'휴대폰'}
                    inputType={'text'}
                    name={'phoneNumber'}
                    disabled={auth_start}
                    initValue={userPhone}
                    onChange={onChangePhone}
                    onClick={auth_start ?onClickReSendAuth :getMobileAuthNumber}
                    placeholder={'숫자만 입력해 주세요.'}
                    buttonTitle={auth_start ? '인증번호 재발송' : '인증번호 발송'}
                />
               <div className={cx('auth-btn', { not_view: !auth_start })}>
                    <SignAuthInput
                          inputType={'text'}
                          initValue={userAuth}
                          name={'authNumber'}
                          onClick={sendMobileAuthNumber}
                          onChange={onChangeAuth}
                          buttonTitle={'인증하기'}
                    />
                    <div className={styles['timer']}>
                        {phoneAuth ? (
                            <Check on={true} />
                        ) : (
                            <AuthTimer start={start_timer}></AuthTimer>
                        )}
                    </div>
                </div>

                <div className={styles['btn']}>
                    <Button title={'확인'} disable={!phoneAuth} toggle={phoneAuth}/>
                </div>
            </div>
        </div>
    );
};

export default RecoveryIdContainer;
