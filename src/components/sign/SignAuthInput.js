import React from 'react';
import styles from './SignModule.module.scss';

const SignAuthInput = ({ inputType, onChange, initValue ,buttonTitle ,placeholder}) => {
    return (
        <div className={styles['sign-input']}>
            <input className={styles['auth']} type={inputType} value={initValue}  placeholder={placeholder} onChange={onChange} ></input>
            <button className={styles['auth-btn']}>{buttonTitle}</button>
        </div>
    )
}
export default SignAuthInput;