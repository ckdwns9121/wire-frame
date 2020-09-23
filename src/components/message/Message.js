import React from 'react';
import styles from './Message.module.scss';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';

// 맞춤 주문시 보여줄 컴포넌트
const Message = ({ msg, onClick, isButton, buttonName, size = 500 }) => {
    return (
        <div
            className={styles['reserve-custom-order']}
            style={{ height: size + 'px' }}
        >
            <div className={styles['title-msg']}>{msg}</div>
            {isButton ? (
                <Button className={styles['custom-btn']} onClick={onClick}>
                    {buttonName}
                </Button>
            ) : null}
        </div>
    );
};

Message.propTypes = {
    msg: propTypes.string,
    onClick: propTypes.func,
    isButton: propTypes.bool,
};

Message.defaultProps = {
    src: true,
    msg: '아주나무',
    isButton: false,
    onClick: () => console.warn('onClick no defined'),
};

export default Message;
