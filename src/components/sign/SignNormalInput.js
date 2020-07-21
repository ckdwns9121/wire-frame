import React from 'react';
import styles from './SignModule.module.scss';

const SignNormalInput = ({ inputType, onChange, initValue, placeholder }) => {
    return (
        <div className={styles.signInput}>
            <input className={`${styles.normal}`} placeholder={placeholder} type={inputType} value={initValue} onChange={onChange} ></input>
        </div>
    )
}

export default SignNormalInput;