import React from 'react';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import TempleteItem from './TempleteItem';
import logo from 'logo.svg';
import menu1 from '../svg/menu/menu1.png';
import menu2 from '../svg/menu/menu2.png';
import menu3 from '../svg/menu/menu3.png';
import menu4 from '../svg/menu/menu4.png';

const initMenu = [
    {
        item_id: 1,
        title: "과일도시락",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: menu1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:menu2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img : menu3,
        price: "5000원"
    },    
    {
        id: 4,
        title: "과일도시락4",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: menu4,
        price: "5000원"
    },    {
        id: 5,
        title: "과일도시락5",
        img: menu1,
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        price: "5000원"
    },    {
        id: 6,
        title: "과일도시락6",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:menu2,
        price: "5000원"
    },
    {
        id: 7,
        title: "과일도시락7",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:menu3,
        price: "5000원"
    },
    {
        id: 8,
        title: "과일도시락8",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:menu4,
        price: "5000원"
    },
    {
        id: 9,
        title: "과일도시락9",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:menu1,
        price: "5000원"
    },

]



const MenuItemList = () => {
    const menuList = initMenu.map(menu => (
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