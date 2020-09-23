import React from 'react';
import styles from './Addr.module.scss';
import Cross from '../svg/cross/Cross';
const DeliveryrItem = (props) => {
    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */
    const { addr1, addr2, lat, lan } = props;
    console.log(props);

    //배달 받을 주소로 설정
    const handleClick = () => {
        console.log('배달지 주소로 선택합니다');
    };

    //최근 배달 주소 삭제
    const handleRemove = () => {
        console.log('배달지 삭제 삭제');
    };

    return (
        <div className={styles['address-item']} onClick={handleClick}>
            <JibunAddrBox jibunAddr={addr1}></JibunAddrBox>
            <RoadAddrBox roadAddr={addr2}></RoadAddrBox>
            <div className={styles['delete']}>
                <Cross color="#555" angle={45} />
            </div>
        </div>
    );
};
const JibunAddrBox = ({ jibunAddr }) => {
    return <div className={styles['jibun-box']}>{jibunAddr}</div>;
};
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn /> {roadAddr}
        </div>
    );
};
const AddrBtn = () => {
    return <div className={styles['btn']}>지번</div>;
};

export default DeliveryrItem;
