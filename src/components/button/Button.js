import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames/bind';
const cx = cn.bind(styles);


const Button =({title, onClick,toggle})=>{
    return(
        <div className={cx('btn',{toggle:toggle})} onClick ={onClick}>{title}</div>
    )
}

Button.defaultProps={
    toggle:false,
}

export default Button; 