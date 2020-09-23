import React from 'react';
import styles from './OtherMenu.module.scss';

//홈 메뉴 아이템 컴포넌트
const OtherUserMenuItem = ({
    item_id,
    menuTitle,
    menuPrice,
    src,
}) => {
    // item_id 로 경로 줘야함
    return (
        <div className={styles['menu-item']}>
            <MenuImg src={src} />
            <div className={styles['menu-info']}>
                <MenuTitle menuTitle={menuTitle} />
                <MenuPrice menuPrice={menuPrice} />
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
    return <div className={styles['menu-title']}>{menuTitle}</div>;
}

//홈 메뉴 가격 컴포넌트
function MenuPrice({ menuPrice }) {
    return <div className={styles['menu-price']}>{menuPrice}</div>;
}

export default OtherUserMenuItem;
