import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './Menu.module.scss';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';

//홈 메뉴 아이템 컴포넌트
const MenuItem = ({ item_id, menuTitle, menuText, menuPrice, src, index }) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const history = useHistory();
    // item_id 로 경로 줘야함

    return (
        <div className={styles['menu-item']}
            data-aos='fade-up' data-aos-delay={200 * index}
            onClick={() => history.push(Paths.ajoonamu.product)}>
            <MenuImg src={src} />
            <div className={styles['pd-box']}>
                <div className={styles['menu-info']}>
                    <MenuTitle menuTitle={menuTitle} />
                    <MenuText menuText={menuText} />
                    <MenuPrice menuPrice={menuPrice} />
                </div>
            </div>
        </div>
    );
};

//홈 메뉴 이미지 컴포넌트
function MenuImg({ src }) {
    return (
        <div className={styles['menu-img']}>
            <img className={styles['img']} src={src} alt={"메뉴 이미지"} />
        </div>
    );
}
//홈 메뉴 제목 컴포넌트
function MenuTitle({ menuTitle }) {
    return <div className={styles['menu-title']}>{menuTitle}</div>;
}

//홈 메뉴 텍스트 컴포넌트
function MenuText({ menuText }) {
    return <div className={styles['menu-text']}>{menuText}</div>;
}

//홈 메뉴 가격 컴포넌트
function MenuPrice({ menuPrice }) {
    return <div className={styles['menu-price']}>{menuPrice}</div>;
}

export default MenuItem;
