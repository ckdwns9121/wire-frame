import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
const cx = cn.bind(styles);

const Button = ({ title, disable, onClick, toggle }) => {

    const temp =()=>{}
    return (
        <ButtonBase className={cx('btn', { toggle, disable })} onClick={!disable ? onClick: temp }>
            {title}
        </ButtonBase>
    );
};

Button.defaultProps = {
    toggle: false,
    disable: false,
    onClick : ()=>console.warn('not found'),
};

export default Button;
