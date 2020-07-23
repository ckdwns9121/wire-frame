import React from 'react';
import styles from './Addr.module.scss';

const AddrItem =({jibunAddr,roadAddr})=>{

    return(
        <div className={styles['address-item']}>
                <JibunAddrBox jibunAddr={jibunAddr}></JibunAddrBox>
                <RoadAddrBox roadAddr={roadAddr}></RoadAddrBox>
        </div>
    )
}
const JibunAddrBox =({jibunAddr}) =>{
    return(
        <div className ={styles['jibun-box']}>
            {jibunAddr}
        </div>
    )
}
const RoadAddrBox =({roadAddr}) =>{
    return(
        <div className ={styles['roadAddr-box']}>
           <AddrBtn/> {roadAddr}
        </div>
    )
}
const AddrBtn =()=>{
    return(
        <div className={styles['btn']}>
            도로명
        </div>
    )
}

export default AddrItem;