import React from 'react';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames/bind';

import styles from './DetailPaging.module.scss';
import { useHistory } from 'react-router-dom';

const cn = classnames.bind(styles);

export default ({ baseURL }) => {

    const history = useHistory();

    return (
        <div className={styles['paging']}>
            <div className={styles['move']}>
                <ButtonBase className={cn('button', { disabled: true })}>이전</ButtonBase>
                <ButtonBase className={cn('button', { disabled: true })}>다음</ButtonBase>
            </div>
            <div className={styles['back']}>
                <ButtonBase className={cn('button', 'black')} onClick={() => history.push(baseURL)}>
                    목록
                </ButtonBase>
            </div>
        </div>
    )
}