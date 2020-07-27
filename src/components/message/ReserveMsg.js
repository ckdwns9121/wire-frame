import React from 'react';
import styles from './Message.module.scss';


//맞춤 주문시 보여줄 컴포넌트
const ReserveMsg =({onClick})=>{

    return(
        <div className={styles['reserve-custom-order']}>
            <div className={styles['title-msg']}>
            전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다.
            </div>
            <div className={styles['custom-btn']} onClick={onClick}>
                맞춤 주문 설정하기
            </div>
        </div>
    )
}

export default ReserveMsg;