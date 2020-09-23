import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignNormalInput from 'components/sign/SignNormalInput';
import SignAuthInput from 'components/sign/SignAuthInput';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountContainer = () => {
    const { user } = useSelector(state => state.auth);

    console.log(user);
    useEffect(() => {

    }, [user]);

    return (
        <>
            <div className={styles['container']}>
                내정보
            </div>
        </>
    )
}

export default AccountContainer;