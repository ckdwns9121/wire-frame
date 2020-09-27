import React from 'react';
import styles from './Preview.module.scss';
import menu1 from '../svg/menu/menu1.png';
import Arrow from '../svg/arrow/Arrow';
import { numberFormat } from "../../lib/formatter";

const PreviewOrderItem = (props) => {

    console.log(props);
    const {
        cp_price,
        items,
        order_id,
        point_price,
        receipt_price,
        send_cost,
        total_price,
    } = props;



    return (
        <div className={styles['preview-item']}>
            <div className={styles['preview-title-bar']}>
                <div className={styles['order-info']}>
                    <div className={styles['top']}>
                        <div className={styles['order-date']}>
                            2020/06/01 13:30:10
                        </div>
                        <div className={styles['order-id']}>
                            주문번호 : {order_id}
                        </div>
                        <div className={styles['order-type']}>배달완료</div>
                    </div>
                    <div className={styles['bottom']}>
                        <div className={styles['req-date']}>
                            배달 요청 시간 : 2020-06-02 09:30:00
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['menu-list']}>
                <MenuList items= {items}/>
            </div>
            <div className={styles['href-detail']} onClick={props.onClick}>
                <div className={styles['text']}>주문 상세보기</div>
                <div className={styles['icon']}>
                    <Arrow />
                </div>
            </div>
        </div>
    );
};

function MenuList ({items}){
    const list =items.map( (item,index) =>(
        <MenuItem  
        key={index} 
        item_name={item.item_name} 
        item_option={item.item_option}
        item_price={item.item_price}
        />
    ));
    return(
        <> {list}</>
    )
}

function MenuItem({ src, item_name, item_option, item_price }) {
    return (
        <div className={styles['menu-item']}>
            <div className={styles['menu-img']}>
                <img src={menu1} alt="메뉴" />
            </div>
            <div className={styles['menu-name']}>{item_name}</div>
            <div className={styles['menu-price']}>
                {1}개 ({numberFormat(item_price)}원)
            </div>
            <div className={styles['menu-options']}>(추가선택: {item_option ? item_option : '없음'})</div>
        </div>
    );
}
export default PreviewOrderItem;
