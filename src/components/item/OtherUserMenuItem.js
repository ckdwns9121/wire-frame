import React from 'react';
import styles from './OtherMenu.module.scss';
import IMG from '../svg/menu/menu1.png';
import { numberFormat } from "../../lib/formatter";

//홈 메뉴 아이템 컴포넌트
const OtherUserMenuItem = (props) => {
    


    // item_id 로 경로 줘야함
    return (
        <div className={styles['menu-item']}>
            <MenuImg src={IMG} />
            <div className={styles['menu-info']}>
                <MenuTitle menuTitle={props.item_name} />
                <MenuPrice menuPrice={props.item_price} />
            </div>
        </div>
    );
};

//홈 메뉴 이미지 컴포넌트
function MenuImg({ src }) {
    return (
        <div className={styles['menu-img']}>
            <img className={styles['img']} src={src} alt="메뉴 아이템" />
        </div>
    );
}
//홈 메뉴 제목 컴포넌트
function MenuTitle({ menuTitle }) {
    return (<div className={styles['menu-title']}>{menuTitle}</div>);
}

//홈 메뉴 가격 컴포넌트
function MenuPrice({ menuPrice }) {
    return (<div className={styles['menu-price']}>{numberFormat(menuPrice)}원~</div>);
}

export default OtherUserMenuItem;
