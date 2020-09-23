import React, { useState ,useCallback} from 'react';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';
import AuthTimer from 'components/sign/AuthTimer';
import Check from 'components/svg/coupon/Check';
import {
    requestPostMobileAuth,
    requestPostMobileAuthCheck,
} from '../../api/auth/auth';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const RecoveryPwContainer = () => {
    // const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');

    const [auth_start, setAuth] = useState(false);
    const [start_timer, setStartTimer] = useState(false);
    const [phoneAuth, setPhoneAuth] = useState(false); //인증번호 성공

    const onChangePhone = (e) => {
        setUserPhone(e.target.value);
    };
    const onChangeAuth = (e) => {
        setUserAuth(e.target.value);
    };

    //인증번호 발송
    const getMobileAuthNumber = async () => {
        setAuth(!auth_start);
        setStartTimer(true);
        // const res = await requestPostMobileAuth(phoneNumber);
        // console.log(res);
        // if (res.data.msg === '실패!') {
        //     alert('인증번호 전송에 실패했습니다.');
        // } else {
        //     alert('인증번호가 성공적으로 발송되었습니다!');
        // }
    };

    //인증번호 재발송
    const onClickReSendAuth = () => {
        setStartTimer(false);
        setTimeout(() => setStartTimer(true), 0);
    };

    const sendMobileAuthNumber = useCallback(async () => {
        const res = await requestPostMobileAuthCheck(userPhone, userAuth);
        if (res.data.msg === '성공!') {
            alert('성공적으로 인증되었습니다!');
            setPhoneAuth(true);
        } else {
            alert('인증번호를 다시 한 번 확인해 주세요!');
        }
    }, [userPhone, userAuth]);

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>비밀번호 찾기</div>
                <div className={styles['box']}>
                    <SignNormalInput label={'이름'} />
                    <div className={styles['small-divider']} />
                    <SignNormalInput label={'이메일'} />
                </div>
                <div className={styles['big-divider']} />
                <div className={styles['box']}>
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
                </div>
                <div className={styles['btn']}>
                    <Button title={'확인'} disable={true} />
                </div>
            </div>
        </div>
    );
};

export default RecoveryPwContainer;
