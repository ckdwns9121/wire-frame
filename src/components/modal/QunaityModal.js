import React, { useCallback, useState } from 'react';
import styles from './Qunaity.module.scss';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '../svg/modal/CloseIcon';
import { ButtonBase, IconButton } from '@material-ui/core';

const QunaityModal = (props) => {
 

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className={styles['dialog']}
        >
            <div className={styles['title-bar']}>
                <div className={styles['title']}> 수량변경 </div>
                <div className={styles['close']} onClick={props.handleClose}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['modal-input-box']}>
                    <input
                        className={styles['value-input']}
                        value={props.count}
                        onChange={props.onChange}
                    />
                </div>
                <ButtonBase
                    className={styles['btn']}
                    onClick={props.onSetting}
                >
                    수량 변경
                </ButtonBase>
            </div>
        </Dialog>
    );
};

export default QunaityModal;
