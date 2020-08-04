import React from 'react';
import styles from './Error.module.scss';
import logo from 'logo.svg';

export default function Error() {
    return (
        <div className={styles['error']}>
            <div className={styles['context']}>
                <div className={styles['logo']}>
                <img src={logo}/>
                </div>
                <div className={styles['explan']}>
                페이지를 찾을 수 없습니다.
                </div>
            </div>
        </div>
    )
}