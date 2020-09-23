import { ButtonBase } from '@material-ui/core';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './SignModule.module.scss';

//인증 버튼을 포함한 input box

const cx = classNames.bind(styles);

const SignAuthInput = ({
    inputType,
    onChange,
    label,
    initValue,
    buttonTitle,
    placeholder,
    name,
    disabled,
    onClick = () => {}
}) => {
    return (
        <div className={styles['sign-input']}>
            <div className={styles['label']}>{label}</div>
            <input
                className={styles['auth']}
                name={name}
                type={inputType}
                value={initValue}
                placeholder={placeholder}
                onChange={onChange}
            ></input>
            <ButtonBase onClick={onClick} className={cx('auth-btn', { disabled })}>{buttonTitle}</ButtonBase>
        </div>
    );
};
export default SignAuthInput;
