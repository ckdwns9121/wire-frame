import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import { logo, storeIcon, locationIcon, searchIcon } from '../svg/header';

import styled from 'styled-components';

const TabLink = styled(NavLink)`
    text-decoration: none;
    cursor: pointer;
    color: #222;
    font-weight: normal;
    font-size: 1.333rem;
    &.active {
        font-weight: 500;
    }
`;

const HeadLink = styled(Link)`
    font-size: 22px;
    font-weight: bold;
    color: #222;
    text-decoration: none;
`;

const Header = () => {
    const history = useHistory();

    const onClickHome = () => history.push(Paths.index);
    const onClickAddr = () => history.push(Paths.ajoonamu.address);

    return (
        <div className={styles['header']}>
            <div className={styles['sub']}>
                <div className={styles['content']}>
                    <div className={styles['addr-store']}>
                        <div className={styles['info']}>
                            <img
                                src={locationIcon}
                                alt="배달"
                                onClick={onClickAddr}
                            />
                            <div
                                className={styles['text']}
                                onClick={onClickAddr}
                            >
                                배달받으실 주소를 입력해주세요.
                            </div>
                            <img src={storeIcon} alt="배달"></img>
                            <div
                                className={styles['text']}
                                onClick={onClickAddr}
                            >
                                아주나무 지점 미설정
                            </div>
                        </div>
                        <div className={styles['auth']}>
                            <TabLink
                                className={styles['box']}
                                to={Paths.ajoonamu.signin}
                            >
                                로그인
                            </TabLink>
                            <TabLink
                                className={styles['box']}
                                to={Paths.ajoonamu.signup}
                            >
                                회원가입
                            </TabLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['header-nav']}>
                <div className={styles['header-logo']} onClick={onClickHome}>
                    <img className={styles['logo']} alt={'로고'} src={logo} />
                </div>
                <div className={styles['header-menu']}>
                    <ul>
                        <li onClick={onClickHome}>
                            <HeadLink to={Paths.index}>브랜드홈</HeadLink>
                        </li>
                        <li>
                            <HeadLink to={Paths.ajoonamu.shop}>예약주문</HeadLink>
                        </li>
                        <li>
                            <HeadLink to={Paths.ajoonamu.breakfast}>기업조식</HeadLink>
                        </li>
                        <li>
                            <HeadLink to={Paths.ajoonamu.event}>이벤트</HeadLink>
                        </li>
                        <li>
                            <HeadLink to={Paths.ajoonamu.support}>고객센터</HeadLink>
                        </li>
                    </ul>
                </div>
                <div className={styles['header-input']}>
                    <div className={styles['input']}>
                        <input className={styles['search']} />
                        <img
                            className={styles['icon']}
                            src={searchIcon}
                            alt="검색"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
