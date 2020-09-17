import React from 'react';
import styles from './Custom.module.scss';
import logo from 'logo.svg';
import Button from '../../components/button/Button';



//추천 메뉴 아이템
const CustomItem = ({datas}) => {
    return (
        <div className={styles['custom-item']}>
            <div className={styles['content']}>
                <div className={styles['menu']}>
                    <CustomMenuItemList datas={datas}/>
                </div>
                <div className={styles['order']}>
                    <div className={styles['order-count']}>
                        주문수량 10개
                    </div>
                    <div className={styles['order-price']}>
                        결제금액 5000원
                    </div>
                    <div className={styles['box']}>
                        <Button/>
                    </div>
                </div>

            </div>
        </div>
    )
}

//추천 메뉴에서 이미지를 렌더할 컴포넌트
function CustomMenuItem({ src,menu_name,menu_count,menu_price }) {
    return (
        <div className={styles['menu-item']}>
            <div className={styles['menu-img']}>
            <img src={src} alt={menu_name}></img>
            </div>  
            <div className={styles['menu-info']}>
                <div className={styles['menu-name']}>
                {menu_name}
                </div>
                <div className={styles['menu-count']}>
                {menu_count}개
                </div>
                <div className={styles['menu-price']}>
                {menu_price}원
                </div>
            </div>
        </div>
    )
}

//추천 메뉴리스트에서 아이템 리스트를 렌더
function CustomMenuItemList({ datas }) {
    const list = datas.map(item => (
        <CustomMenuItem src={item.img}  menu_name={item.title} menu_count={item.count} menu_price={item.price}/>
    ))
    return (
        <div className={styles['menu-list']}>
            {list}
        </div>
    )
}


export default CustomItem;