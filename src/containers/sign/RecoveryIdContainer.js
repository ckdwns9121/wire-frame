import React, { useState } from 'react';
import styles from './Recovery.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import Button from 'components/button/Button';

const RecoveryIdContainer = () => {
    
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAuth, setUserAuth] = useState('');
    
    const onChangeId =(e)=>{
        setUserName(e.target.value);
    }
    const onChangePhone =(e)=>{
        setUserPhone(e.target.value);
    }
    const onChangeAuth =(e)=>{
        setUserAuth(e.target.value);
    }


    return (
        <div className={styles['container']}>
            <div className={styles ['content']}>
                <div className={styles['title']}>
                    아이디 찾기
                </div>
                <SignNormalInput label={"이름"} inputType={"text"} initValue={userName} onChange={onChangeId}/>
                <SignAuthInput label={"휴대폰"} inputType={"text"} initValue={userPhone} buttonTitle={"인증번호 발송"} onChange={onChangePhone}/>
                <div className={styles['auth-phone']}>
                <SignAuthInput inputType={"text"} initValue={userAuth} buttonTitle={"인증하기"}  onChange={onChangeAuth}/>
                </div>
                <div className={styles['btn']}>
                <Button title={"확인"}></Button>
                </div>
            </div>

        </div>
    )
}


export default RecoveryIdContainer;