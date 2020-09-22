import React, { useState } from 'react';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';

const RecoveryPwContainer = () => {
    // const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');

    const onChangePhone = (e) => {
        setUserPhone(e.target.value);
    };
    const onChangeAuth = (e) => {
        setUserAuth(e.target.value);
    };

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
                        initValue={userPhone}
                        buttonTitle={'인증번호 발송'}
                        onChange={onChangePhone}
                    />
                    <div className={styles['small-divider']} />
                    <SignAuthInput
                        inputType={'text'}
                        initValue={userAuth}
                        buttonTitle={'인증하기'}
                        onChange={onChangeAuth}
                    />
                </div>
                <div className={styles['btn']}>
                    <Button title={'확인'} disable={true} />
                </div>
            </div>
        </div>
    );
};

export default RecoveryPwContainer;
