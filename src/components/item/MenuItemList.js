import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const MenuItemList = ({ menu_list }) => {
    const menuList = menu_list.map((menu, index) => (
        <MenuItem
            key={menu.item_id}
            menuTitle={menu.title}
            menuText={menu.text}
            menuPrice={menu.price}
            src={menu.img}
            index={index}
        />
    ));
    return (<div className={styles['menu-list']}>{menuList}</div>);
};

export default MenuItemList;
