import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import Select from 'components/svg/select/Select';
import { useStore } from '../../hooks/useStore';
import { stringToTel } from '../../lib/formatter';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

const AccountContainer = () => {
    const user_token = useStore();
    const { user } = useSelector((state) => state.auth);

    const [passwordChangeMode, setPasswordChangeMode] = useState(false);
    const [phoneChangeMode, setPhoneChangeMode] = useState(false);

    const [agree, setAgree] = useState(false);
    

    const onChangeAgree = () => {
        setAgree(!agree);
    };

    useEffect(() => {}, [user]);

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['table']}>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>이름</div>
                        <input
                            className={styles['user-input']}
                            value={user && user.name}
                        ></input>
                    </div>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>이메일</div>
                        <div className={styles['user-value']}>
                            {user && user.email}
                        </div>
                    </div>
                    <div className={cx('cell', 'pd-bottom')}>
                        <div className={styles['label']}>비밀번호</div>
                        <ButtonBase className={styles['user-change']} onClick={() => setPasswordChangeMode(true)}>
                            변경하기
                        </ButtonBase>
                    </div>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>휴대폰 번호</div>
                        <div className={styles['user-value']}>
                            {user && user.hp && stringToTel(user.hp)}
                        </div>
                    </div>
                    <div className={cx('cell', 'pd-bottom')}>
                        <div className={styles['label']}></div>
                        <ButtonBase className={styles['user-change']} onClick={() => setPhoneChangeMode(true)}>
                            변경하기
                        </ButtonBase>
                    </div>
                    <div className={cx('cell', 'line')}>
                        <div className={styles['label']}>알림설정</div>
                        <div
                            className={styles['user-value']}
                            onClick={onChangeAgree}
                        >
                            <Select check={agree} />
                            <span>
                                SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를
                                받아보실 수 있습니다.
                            </span>
                        </div>
                    </div>
                    <div className={styles['btn']}>
                        <ButtonBase className={styles['update']}>
                            내 정보 수정
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountContainer;
