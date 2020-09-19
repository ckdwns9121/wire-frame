import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import TempleteItem from './TempleteItem';
import logo from 'logo.svg';
import menu1 from '../svg/menu/menu1.png';
import menu2 from '../svg/menu/menu2.png';
import menu3 from '../svg/menu/menu3.png';
import menu4 from '../svg/menu/menu4.png';




const MenuItemList = ({menu_list}) => {
    console.log(menu_list)
    const menuList = menu_list.map(menu => (
        <MenuItem key={menu.item_id} menuTitle={menu.title} menuText={menu.text} menuPrice={menu.price} src ={menu.img}/>
    )
    )
    return (
        <div className={styles['menu-list']}>
            {menuList}
        </div>

    )
}

export default MenuItemList;