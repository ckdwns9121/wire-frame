import React from 'react';
import styles from './Addr.module.scss';
import LatestAddrItem from './LatestAddrItem';

const LatesAddrItemList =({addrs,onClick})=>{

    /*
        최근주소 컴포넌트를 렌더할 리스트
    */ 
    
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