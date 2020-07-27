import React from 'react';
import styles from './Reserve.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import Tabs from 'components/nav/Tabs';
import MenuItemList from 'components/listbox/MenuItemList';

const ReserveContainer =()=>{

    return(
        <>
           <Header></Header>
           <Title mainTitle={"예약주문>메뉴"} subTitle={"예약주문 메뉴 리스트"}></Title>
           <div className={styles['reserve-tab']}>
           <Tabs>
           <Header></Header>
           <MenuItemList/>
           </Tabs>
           </div>
        </>
    )
}
export default ReserveContainer;