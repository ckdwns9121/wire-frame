import React from 'react';
import styles from './SignModule.module.scss';

//인증 버튼을 포함하지 않을 input

const SignNormalInput = ({ inputType,label ,onChange, initValue, placeholder }) => {
    return (
        <div className={styles['sign-input']}>
                 <div className={styles['label']}>
                  {label}
            </div>
            <input className={styles['normal']} placeholder={placeholder} type={inputType} value={initValue} onChange={onChange} ></input>
        </div>
    )
}

export default SignNormalInput;