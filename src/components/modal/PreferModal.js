import React, { useCallback, useState } from 'react';
import styles from './PreferModal.module.scss';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '../svg/modal/CloseIcon';
import { ButtonBase, IconButton } from '@material-ui/core';

const ReserveModal = (props) => {

    const [value, setValue] = useState(1);

    const setMinus = useCallback(() => {
        if (value > 1) {
            setValue(value - 1);
        }
    }, [value]);
    const setPlus = useCallback(() => setValue(value + 1), [value]);

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
                <div className={styles['title']}> 맞춤 주문 설정 </div>
                <div className={styles['close']} onClick={props.handleClose}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles['modal-content']}>
                <div className={styles['label']}>주문종류</div>
                <div className={styles['modal-input-box']}>
                    <form>
                        <select
                            value={props.itemType}
                            onChange={props.onChangeType}
                        >
                            <option value="reserve">예약주문</option>
                            <option value="delivery">배달주문</option>
                        </select>
                    </form>
                </div>
                <div className={styles['label']}>전체예산</div>
                <div className={styles['modal-input-box']}>
                    <input
                        className={styles['value-input']}
                        value={props.budget}
                        onChange={props.onChangeBudget}
                    />
                    <span>원 부터</span>
                    <input
                        className={styles['value-input']}
                        value={props.budget}
                        onChange={props.onChangeBudget}
                    />
                    <span>원 까지</span>
                </div>

                <div className={styles['box']}>
                    <div className={styles['label']}>희망 수량</div>
                    <div className={styles['counter']}>
                        <div className={styles['count-box']}>
                            <IconButton onClick={setMinus} className={styles['decrement']}>-</IconButton>
                            <div className={styles['value']}>{value}</div>
                            <IconButton onClick={setPlus} className={styles['increment']}>+</IconButton>
                        </div>
                    </div>
                </div>
                <ButtonBase
                    className={styles['btn']}
                    onClick={props.onClickCustomOrder}
                >
                    설정
                </ButtonBase>
            </div>
        </Dialog>
    );
};

export default ReserveModal;
