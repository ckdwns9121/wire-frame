import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const initMenu = [
    {
        id: 1,
        title: "김치",
        text: "김치 맛잇어",
        price: "5000원"
    },
    {
        id: 2,
        title: "김치",
        text: "김치 맛잇어",
        price: "5000원"
    },
    {
        id: 3,
        title: "김치",
        text: "김치 맛잇어",
        price: "5000원"
    },
    {
        id: 4,
        title: "김치",
        text: "김치 맛잇어",
        price: "5000원"
    },
]


const MenuItemList = () => {
    const menuList = initMenu.map(menu => (
        <MenuItem menuTitle={menu.titlte} menuText={menu.text} menuPrice={menu.price} />
    )
    )
    return (
        <div className={styles['menu-list']}>
            {menuList}
        </div>

    )
}

export default MenuItemList;