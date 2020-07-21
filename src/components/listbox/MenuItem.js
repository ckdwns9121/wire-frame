import React from 'react';
import styles from './Menu.module.scss';

const img ="http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg";

const MenuItem =({menuTitle,menuText,src})=>{
    return(
        <div className={styles['menu-item']}>
            <MenuImg/>
            <div className={styles['text-area']}>
            <MenuTitle menuTitle={"김치"}/>
            <MenuText menuText={"김치마싯어"}/>
            <MenuPrice menuPrice={"5000"}/>
            </div>
        </div>
    )

}

function MenuImg({src}){
    return(
        <div className={styles['img-item']}>
        <img className={styles.img}src={img}></img>
        </div>
    )
}
function MenuTitle ({menuTitle}){
    return(
        <div className={styles['menu-title']}>
            {menuTitle}
        </div>
    )
}
function MenuText ({menuText}){
    return(
        <div className={styles['menu-text']}>
            {menuText}
        </div>
    )
}
function MenuPrice ({menuPrice}){
    return(
        <div className={styles['menu-price']}>
            {menuPrice}
        </div>
    )
}

export default MenuItem;