import React from 'react';
import styles from './Preview.module.scss';
import menu1 from '../svg/menu/menu1.png';
import menu2 from '../svg/menu/menu2.png';
import menu3 from '../svg/menu/menu3.png';
import Arrow from '../svg/arrow/Arrow';
const PreviewOrderItem = (props) => {
    return (
        <div className={styles['preview-item']}>
            <div className={styles['preview-title-bar']}>
                <div className={styles['order-info']}>
                    <div className={styles['top']}>
                        <div className={styles['order-date']}>
                        2020/06/01 13:30:10
                        </div>
                        <div className={styles['order-id']}>
                        주문번호 : 54545475741
                        </div>
                        <div className={styles['order-type']}>
                            배달완료
                        </div>
                    </div>
                    <div className={styles['bottom']}>
                        <div className={styles['req-date']}>
                            배달 요청 시간 : 2020-06-02 09:30:00
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['menu-list']}>
                <MenuItem src={menu1} item_name={"떡볶이"} item_quanity={"10"} item_price={"100,000원"}/>
                <MenuItem src={menu2}item_name={"떡볶이"} item_quanity={"10"} item_price={"100,000원"}/>
                <MenuItem src={menu3} item_name={"떡볶이"} item_quanity={"10"} item_price={"100,000원"}/>
            </div>
            <div className={styles['href-detail']} onClick={props.onClick}>
                <div className={styles['text']}>
                    주문 상세보기
                </div>
                <div className={styles['icon']}>
                <Arrow/>
                </div>
            </div>
        </div>
    );
};

function MenuItem({src,item_name,item_quanity, item_price}) {
    return (
        <div className={styles['menu-item']}>
            <div className={styles['menu-img']}>
                <img src={src} alt="메뉴" />
            </div>
            <div className={styles['menu-name']}>{item_name}</div>
            <div className={styles['menu-price']}>{item_quanity}개 {item_price}</div>
            <div className={styles['menu-options']}>(추가선택: 없음)</div>
        </div>
    );
}
export default PreviewOrderItem;
