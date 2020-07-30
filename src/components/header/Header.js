import React from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from 'logo.svg';

const Header =()=>{
    const history = useHistory();

    const goToHome =()=> history.push(Paths.index);
    const onLogin=()=>history.push(Paths.ajoonamu.signin);
    const goToReserve =() =>history.push(`${Paths.ajoonamu.reserve}/custom`);

    return(
        <div className={styles['header']}>
            <div className ={styles['header-nav']}>
                <div className={styles['header-logo']} onClick={goToHome}>
                    <img className ={styles['header-logoimg']} src={logo}></img>
                </div>
                <div className={styles['header-menu']}>
                    <ui>
                        <li onClick={goToHome}>브랜드홈</li>
                        <li onClick={goToReserve}>예약주문</li>
                        <li>택배배송</li>
                        <li>이벤트</li>
                        <li>고객센터</li>
                    </ui>
                </div>
                <div className={styles['header-user']} onClick={onLogin}>
                    <ui>
                        <li>로그인</li>
                    </ui>
                </div>
            </div>
        </div>
    )
}

export default Header;