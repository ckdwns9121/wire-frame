import React ,{useState} from 'react';
import {Paths} from 'paths';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from './TabMenu.module.scss';



const TabLink = styled(NavLink)`
    text-decoration:none;
    color:black;

`;

const TabMenu =({menu}) =>{

    const activeStyle = {
        height :'100%',
        textDecoration:'none',
        color:'black',
        borderBottom:'3px solid #000'
    };

    return(
        <div className={styles['tab-menu']}>
           <TabLink exact to={`${Paths.ajoonamu.reserve}/custom?`} activeStyle={activeStyle}>  <TabItem title={"추천메뉴"}/> </TabLink>
           <TabLink exact to={`${Paths.ajoonamu.reserve}/menu1`} activeStyle={activeStyle}>  <TabItem title={"분류1"}/> </TabLink>
           <TabLink exact to={`${Paths.ajoonamu.reserve}/menu2`} activeStyle={activeStyle}>  <TabItem title={"분류 2"}/> </TabLink>
           <TabLink exact to={`${Paths.ajoonamu.reserve}/menu3`} activeStyle={activeStyle}>  <TabItem title={"분류3"}/> </TabLink>
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