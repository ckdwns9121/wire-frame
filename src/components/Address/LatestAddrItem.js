import React from 'react';
import styles from './Addr.module.scss';

const LatestAddrItem = ({ jibunAddr, roadAddr, onClick }) => {

    const handleClick = () => {
        console.log("gd");
        var data = jibunAddr;
        //  onClick(data);
    }
    const handleRemove = () => {
        //나중에 id 넣어야함
        console.log("삭제");
    }

    return (
        <div className={styles['latest-item']} onClick={handleClick}>
            <div className={styles['item-box']}>
                <JibunAddrBox jibunAddr={jibunAddr}></JibunAddrBox>
                <RoadAddrBox roadAddr={roadAddr}></RoadAddrBox>
            </div>
            <div className={styles['item-remove']} onClick={(e) => {
                e.stopPropagation();
                handleRemove()
            }}> &times;
            </div>
        </div>
    )
}
const JibunAddrBox = ({ jibunAddr }) => {
    return (
        <div className={styles['jibun-box']}>
            {jibunAddr}
        </div>
    )
}
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn /> {roadAddr}
        </div>
    )
}
const AddrBtn = () => {
    return (
        <div className={styles['btn']}>
            도로명
        </div>
    )
}

export default LatestAddrItem;