import React from 'react';
import styles from './Custom.module.scss';
import CustomItem from './CustomItem';

const CustomItemList = ({menuList}) => {
    console.log(menuList);
    const itemList = menuList.map((data) => (
        <CustomItem datas={data.list} key={data.id}/>
    )
    )
    return (
        <div className={styles['custom-lists']}>
            {itemList}
        </div>

    )
}


export default CustomItemList;