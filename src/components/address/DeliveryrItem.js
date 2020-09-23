import React from 'react';
import styles from './Addr.module.scss';
import RemoveIcon from '../svg/addr/RemoveIcon';

const DeliveryrItem = (props) => {
    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */
    const { addr1, addr2, lat, lan } = props;
    const onRemove=(id)=>{
        props.onRemove(id);
    }

    return (
        <div className={styles['address-item']}  onClick={props.onClick}>
            <JibunAddrBox jibunAddr={addr1}></JibunAddrBox>
            <RoadAddrBox roadAddr={addr2}></RoadAddrBox>
            <div className={styles['delete'] }onClick={(e) => {
          e.stopPropagation(); 
          onRemove(props.id)}
        }><RemoveIcon /></div>
        </div>
    );
};
const JibunAddrBox = ({ jibunAddr }) => {
    return (<div className={styles['jibun-box']}>{jibunAddr}</div>);
};
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn /> {roadAddr}
        </div>
    );
};
const AddrBtn = () => {
    return (<div className={styles['btn']}>지번</div>);
};

export default DeliveryrItem;
