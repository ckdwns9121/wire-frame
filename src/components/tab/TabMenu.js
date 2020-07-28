import React ,{useState} from 'react';
import {Paths} from 'paths';
import {NavLink} from 'react-router-dom';
import styles from './TabMenu.module.scss';

const TabMenu =({menu}) =>{

    const activeStyle = {
        height :'100%',
        background:'gray'
    };

    return(
        <div className={styles['tab-menu']}>
           <NavLink exact to={`${Paths.ajoonamu.reserve}/custom?`} activeStyle={activeStyle}>  <TabItem title={"추천메뉴"}/> </NavLink>
           <NavLink exact to={`${Paths.ajoonamu.reserve}/menu1`} activeStyle={activeStyle}>  <TabItem title={"분류1"}/> </NavLink>
           <NavLink exact to={`${Paths.ajoonamu.reserve}/menu2`} activeStyle={activeStyle}>  <TabItem title={"분류 2"}/> </NavLink>
           <NavLink exact to={`${Paths.ajoonamu.reserve}/menu3`} activeStyle={activeStyle}>  <TabItem title={"분류3"}/> </NavLink>

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