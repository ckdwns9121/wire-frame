import React, { useState,useEffect } from 'react';
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import logo from 'logo.svg';


// 메뉴이름, 추가옵션 , 수량 ,가격 ,이미지 ,구매확정

const CartItem = ({ menuName, menuOptions, menuCount, menuPrice, menuImg,  allChecked ,initCheck}) => {
    const [checked,setChecked] = useState(false);

    const onChangeChecked= ()=>{
        setChecked(!checked)
    }  
    useEffect(()=>{
        setChecked(allChecked);
    },[allChecked])

 
    const testCheck = ()=>{
        console.log("단일 선택"+checked);
        console.log("전체선택"+ allChecked);
    }
 
    
    return (
        <div className={styles['cart-item']} onClick={testCheck}>
            <div className={styles['bar']}>
                <div className={styles['check']}>
                    <input type="checkbox" checked={checked} onChange={onChangeChecked}></input>
                </div>
                <div className={styles['delete']}>
                    &times;
                </div>
            </div>
            <div className={styles['item-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['name']}>
                        과일도시락
                    </div>
                    <div className={styles['options']}>
                        추가선택: 딸기추가(1000원), 토마토추가(1000원)
                    </div>
                    <div className={styles['count-price']}>
                        <div className={styles['count']}>
                            수량 <Counter value={0} />
                        </div>
                        <div className={styles['price']}>
                            23000원
                        </div>
                    </div>
                </div>
                <div className={styles['item-img']}>
                     <img src={logo}></img>
                </div>
            </div>
        </div>

    )
}


export default CartItem;