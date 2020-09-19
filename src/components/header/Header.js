import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import {logo,storeIcon,locationIcon,searchIcon} from '../svg/header';

import styled from 'styled-components';

const TabLink = styled(NavLink)`
    text-decoration:none;
    color:black;
    cursor: pointer;
`;

const Header = () => {
    const { user } = useSelector(state => state.auth);
    const history = useHistory();
    useEffect(() => {
        console.log(user);
    }, [user])

    const onClickLogin = () =>history.push(Paths.ajoonamu.signin);
    const onClickSignup = () =>history.push(Paths.ajoonamu.signup);
    const onClickHome = () => history.push(Paths.index);
    const onClickShop = () => history.push(`${Paths.ajoonamu.shop}?menu=0`);
    const onClickAddr =() => history.push(Paths.ajoonamu.address);

    return (
      <div className={styles["header"]}>
        <div className={styles["sub"]}>
          <div className={styles["content"]}>
            <div className={styles["addr-store"]}>
              <div className={styles["info"]}>
                <img src={locationIcon} alt="배달" onClick={onClickAddr}></img>
                <div className={styles["text"]} onClick={onClickAddr}>
                  배달 받으실 주소를 입력해주세요
                </div>
                <img src={storeIcon} alt="배달"></img>
                <div className={styles["text"]}>아주나무 지점 미설정</div>
              </div>
              <div className={styles["auth"]}>
                <div className={styles["box"]} onClick={onClickLogin}>로그인</div>
                <div className={styles["box"]} onClick={onClickSignup}>회원가입</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["header-nav"]}>
          <div className={styles["header-logo"]} onClick={onClickHome}>
            <img className={styles["logo"]} alt={"로고"} src={logo}></img>
          </div>
          <div className={styles["header-menu"]}>
            <ul>
              <li onClick={onClickHome}>브랜드홈</li>
              <li onClick={onClickShop}>예약주문</li>
              <li>기업조식</li>
              <li>이벤트</li>
              <li>고객센터</li>
            </ul>
          </div>
          <div className={styles["header-input"]}>
            <div className={styles["input"]}>
              <input className={styles["search"]} />
              <img className={styles["icon"]} src={searchIcon} alt="검색"></img>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header;