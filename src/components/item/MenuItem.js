import React from 'react';

import IMG from '../svg/menu/menu1.png';

import styles from './Menu.module.scss';
import { numberFormat,DBImageFormat } from "../../lib/formatter";

//홈 메뉴 아이템 컴포넌트
const MenuItem = (props) => {
    return (
        <div className={styles['menu-item']}
            // data-aos='fade-up' data-aos-delay={200 * ((props.index % 4))}
            onClick={props.onClick}>
            <MenuImg src={props.item_img} />
            <div className={styles['pd-box']}>
                <div className={styles['menu-info']}>
                    <MenuTitle menuTitle={props.item_name} />
                    <MenuText menuText={"아주나무의 여러가지 과일로 알찬 구성 도시락 입니다!"} />
                    <MenuPrice menuPrice={props.item_price} />
                </div>
            </div>
        </div>
    );
};

//홈 메뉴 이미지 컴포넌트
function MenuImg({ src }) {

    return (
        <div className={styles['menu-img']}>
            <img className={styles['img']} src={src === '[]' ? IMG : DBImageFormat(src)} alt={"메뉴 이미지"} />
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
    return <div className={styles['menu-price']}>{numberFormat(menuPrice)}원~</div>;
}

export default MenuItem;
