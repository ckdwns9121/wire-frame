import React from 'react';
import styles from './Templete.module.scss';

const img ="http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg";

const TempleteItem =({src})=>{
    return(
        <div className={styles['templete-item']}>
            <TempleteImg/>
        </div>
    )

}

function TempleteImg({src}){
    return(
        <div className={styles['templete-img']}>
        <img className={styles.img}src={img}></img>
        </div>
    )
}

export default TempleteItem;