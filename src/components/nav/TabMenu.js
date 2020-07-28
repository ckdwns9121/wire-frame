import React ,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './TabMenu.module.scss';

const TabMenu =({menu}) =>{

    const activeStyle = {
        height :'100%',
        background:'gray'
    };

    return(
        <div className={styles['tab-menu']}>
           <NavLink exact to="/reserve/custom" activeStyle={activeStyle}>  <TabItem title={"추천메뉴"}/> </NavLink>
           <NavLink exact to="/reserve/menu1" activeStyle={activeStyle}> <TabItem title={"분류1"}/> </NavLink>
           <NavLink to="/reserve/menu2" activeStyle={activeStyle}> <TabItem title={"분류2"}/> </NavLink>
           <NavLink to ="/reserve/menu3" activeStyle={activeStyle}> <TabItem title={"분류3"}/> </NavLink>
        </div>
    )
}

const TabItem= ({title}) =>{


    return(
        <div className={styles['tab-item']} >
            {title}
        </div>
    )
}
export default TabMenu;