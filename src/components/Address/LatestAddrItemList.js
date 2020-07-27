import React from 'react';
import styles from './Addr.module.scss';
import LatestAddrItem from './LatestAddrItem';

const LatesAddrItemList =({addrs,onClick})=>{

    
    const list = addrs.map(addr =>(
        <LatestAddrItem jibunAddr ={addr.jibunAddr} roadAddr={addr.roadAddr} onClick={onClick}/>
    ))
    return(
        <div className={styles['addr-list']}>
            {list}
        </div>
    )
}


export default LatesAddrItemList;