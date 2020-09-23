import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';
import styles from './MainMenu.module.scss';
import menu1 from '../svg/menu/menu1.png';
import {numberFormat} from '../../lib/formatter';


//홈 메뉴 아이템 컴포넌트
const MenuItem = ({ item_id,  item_name,  item_price, item_img ,onClick}) => {

    const history = useHistory();

        // item_id 로 경로 줘야함
    return (
        <div className={styles['menu-item']}
            onClick={onClick}>
            <MenuImg src={menu1} />
            <div className={styles['pd-box']}>
                <div className={styles['menu-info']}>
                    <MenuTitle menuTitle={item_name} />
                    <MenuPrice menuPrice={item_price} />
                </div>
            </div>
        </div>
    );
};

//홈 메뉴 이미지 컴포넌트
function MenuImg({ src }) {
    return (
        <div className={styles['menu-img']}>
            <img className={styles['img']} src={src} alt="메뉴 이미지" />
        </div>
    );
}
//홈 메뉴 제목 컴포넌트
function MenuTitle({ menuTitle }) {
    return (<div className={styles['menu-title']}>{menuTitle}</div>);
}

//홈 메뉴 텍스트 컴포넌트
function MenuText({ menuText }) {
    return (<div className={styles['menu-text']}>{menuText}</div>);
}

//홈 메뉴 가격 컴포넌트
function MenuPrice({ menuPrice }) {
    return (<div className={styles['menu-price']}>{numberFormat(menuPrice)}원 부터</div>);
}

export default MenuItem;
