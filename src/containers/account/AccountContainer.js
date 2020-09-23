import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import Select from 'components/svg/select/Select';

const cx = classNames.bind(styles);

const AccountContainer = () => {
    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {}, [user]);

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['table']}>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>이름</div>
                        <input className={styles['user-input']}></input>
                    </div>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>이메일</div>
                        <div className={styles['user-value']}>dfd1123@naver.com</div>
                    </div>
                    <div className={cx('cell','pd-bottom')}>
                        <div className={styles['label']}>비밀번호</div>
                        <div className={styles['user-change']}>변경하기</div>
                    </div>
                    <div className={styles['cell']}>
                        <div className={styles['label']}>휴대폰 번호</div>
                        <div className={styles['user-value']}>010-8885-7406</div>
                    </div>
                    <div className={cx('cell','pd-bottom')}>
                        <div className={styles['label']}></div>
                        <div className={styles['user-change']}>변경하기</div>
                    </div>
                    <div className={cx('cell','line')}>
                        <div className={styles['label']}>알림설정</div>
                        <div className={styles['user-value']}>
                            <Select check={true}/>
                            <span>
                             SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 받아보실 수 있습니다.
                            </span>
                         </div>
                    </div>
                    <div className={styles['btn']}>
                            <div className={styles['update']}>
                                내 정보 수정
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountContainer;
