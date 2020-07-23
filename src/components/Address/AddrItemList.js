import React from 'react';
import styles from './Addr.module.scss';
import AddrItem from './AddrItem';

const AddrItemList =({addrs})=>{
    
    const addrsList = addrs.map(addr =>(
        <AddrItem jibunAddr ={addr.jibunAddr} roadAddr={addr.roadAddr}/>
    ))
    return(
        <div className={styles['addr-list']}>
            {addrsList}
        </div>
    )
}



export default AddrItemList;