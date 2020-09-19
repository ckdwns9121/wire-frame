import React from 'react';
import styles from './SignModule.module.scss';


//인증 버튼을 포함한 input box

const SignAuthInput = ({ inputType, onChange, label,initValue ,buttonTitle ,placeholder,name}) => {
    return (
        <div className={styles['sign-input']}>
            <div className={styles['label']}>
                  {label}
            </div>
            <input className={styles['auth']} name={name} type={inputType} value={initValue}  placeholder={placeholder} onChange={onChange} ></input>
            <div className={styles['auth-btn']}>{buttonTitle}</div>
        </div>
    )
}
export default SignAuthInput;