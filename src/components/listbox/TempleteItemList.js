import React from 'react';
import styles from './Templete.module.scss';
import TempleteItem from './TempleteItem';

const initMenu = [
    {
        id: 1,
        title: "김치",
    },
    {
        id: 2,
        title: "김치",
    },
    {
        id: 3,
        title: "김치",
    },
    {
        id: 4,
        title: "김치",
    },
]


const TempleteItemList = () => {
    const templetes = initMenu.map(menu => (
        <TempleteItem id={menu.id}/>
    )
    )
    return (
        <div className={styles['templete-list']}>
            {templetes}
        </div>

    )
}

export default TempleteItemList;