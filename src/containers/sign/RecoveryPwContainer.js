import React, { useState } from 'react';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const RecoveryPwContainer = () => {
    
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    return (
        <div className={styles['container']}>
            <div className={styles ['content']}>
            <div className={styles['title']}>
                    비밀번호 찾기
                </div>
                <div className={styles['box']}>
                <SignNormalInput label={"이름"}/>
                <SignNormalInput label={"이메일"}/>
                </div>
                <div className={styles['box']}>
                <SignAuthInput label={"휴대폰"} inputType={""} initValue={""} buttonTitle={"인증번호 발송"}/>
                <SignAuthInput inputType={""} initValue={""} buttonTitle={"인증하기"}/>
                </div>
                <div className={styles['btn']}>
                <Button title={"확인"}></Button>
                </div>
            </div>
        </div>
    )
}

export default RecoveryPwContainer;