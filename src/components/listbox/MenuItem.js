import React from 'react';
import styles from './Menu.module.scss';

const img ="http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg";


//홈 메뉴 아이템 컴포넌트
const MenuItem =({menuTitle,menuText,menuPrice,src})=>{
    return(
        <div className={styles['menu-item']}>
            <MenuImg src={src}/>
            <div className={styles['text-area']}>
            <MenuTitle menuTitle={menuTitle}/>
            <MenuText menuText={menuText}/>
            <MenuPrice menuPrice={menuPrice}/>
            </div>
        </div>
    )

}

//홈 메뉴 이미지 컴포넌트
function MenuImg({src}){
    return(
        <div className={styles['img-item']}>
        <img className={styles.img}src={src}></img>
        </div>
    )
}
//홈 메뉴 제목 컴포넌트
function MenuTitle ({menuTitle}){
    return(
        <div className={styles['menu-title']}>
            {menuTitle}
        </div>
    )
}

//홈 메뉴 텍스트 컴포넌트
function MenuText ({menuText}){
    return(
        <div className={styles['menu-text']}>
            {menuText}
        </div>
    )
}

//홈 메뉴 가격 컴포넌트
function MenuPrice ({menuPrice}){
    return(
        <div className={styles['menu-price']}>
            {menuPrice}
        </div>
    )
}

export default MenuItem;