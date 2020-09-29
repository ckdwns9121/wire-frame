import React from 'react';
import styles from './MainMenu.module.scss';
import menu1 from '../svg/menu/menu1.png';
import { numberFormat } from '../../lib/formatter';

//홈 메뉴 아이템 컴포넌트
const MenuItem = ({ item_name, item_price, item_img, onClick }) => (
    <div className={styles['menu-item']} onClick={onClick}>
        <MenuImg src={menu1} />
        <div className={styles['pd-box']}>
            <div className={styles['menu-info']}>
                <MenuTitle menuTitle={item_name} />
                <MenuPrice menuPrice={item_price} />
            </div>
        </div>
    </div>
);

//홈 메뉴 이미지 컴포넌트
const MenuImg = ({ src }) => (
    <div className={styles['menu-img']}>
        <img className={styles['img']} src={src} alt="메뉴 이미지" />
    </div>
);

//홈 메뉴 제목 컴포넌트
const MenuTitle = ({ menuTitle }) => (
    <div className={styles['menu-title']}>{menuTitle}</div>
);

//홈 메뉴 가격 컴포넌트
const MenuPrice = ({ menuPrice }) => (
    <div className={styles['menu-price']}>{numberFormat(menuPrice)}원 부터</div>
);

export default MenuItem;
