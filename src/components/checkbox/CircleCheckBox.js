import React from 'react';
import styles from './CheckBox.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export default function CircleCheckBox({ id, text, check, onChange }) {
    return (
        <div className={cx('check', 'item')}>
            <div className={cx('sub-text')}>
                <input
                    type="checkbox"
                    id={id}
                    checked={check}
                    onChange={onChange}
                />
                <label className={styles['label']} htmlFor={id}>
                    <CircleBox on={check} />
                    {text}
                </label>
            </div>
        </div>
    );
}

function CircleBox({check}) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <g
                id="타원_47"
                data-name="타원 47"
                fill="#fff"
                stroke="#dbdbdb"
                strokeWidth="1"
            >
                <circle cx="12" cy="12" r="12" stroke="none" />
                <circle cx="12" cy="12" r="11.5" fill="none" />
            </g>
        </svg>
    );
}
