import React from 'react';
import styles from './CheckBox.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);


export default function SquareCheckBox({ id, text, check, onChange }) {
    return (
        <div className={cx('check', 'item')}>
            <div className={cx('sub-text')}>
                <input type="checkbox" id={id} checked={check} onChange={onChange} />
                <label className={styles['label']} htmlFor={id}>
                    <SquareBox on={check} />{text}
                </label>
            </div>

        </div>
    );
};


function SquareBox (){
    return(
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
        >
            <g
                fill="#fff"
                stroke="#ccc"
                strokeWidth="1"
            >
                <rect width="20" height="20" stroke="none" />
                <rect x="0.5" y="0.5" width="19" height="19" fill="none" />
            </g>
        </svg>
    )
}