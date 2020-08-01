import React from 'react';
import PropsTypes from 'prop-types'; 
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import logo from 'logo.svg';


// 메뉴이름, 추가옵션 , 수량 ,가격 ,이미지 ,구매확정

const CartItem = props => {

    const {id, isChecked,menuName,menuOptions,menuCount,menuPrice} =props;
    const {handleCheckChild} =props;

    const onClick=()=>{
        console.log(isChecked);
    }

    return (
        <div className={styles['cart-item']}  onClick={onClick}>
            <div className={styles['bar']}>
                <div className={styles['check']}>
                    <input type="checkbox" checked={isChecked} id={id}onChange={handleCheckChild}></input>
                </div>
                <div className={styles['delete']}>
                    &times;
                </div>
            </div>
            <div className={styles['item-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['name']}>
                        {menuName}
                    </div>
                    <div className={styles['options']}>
                        {menuOptions}
                    </div>
                    <div className={styles['count-price']}>
                        <div className={styles['count']}>
                            수량 <Counter value={menuCount} />
                        </div>
                        <div className={styles['price']}>
                            {menuPrice}
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

CartItem.PropsTypes ={
    isChecked : PropsTypes.bool,
}
CartItem.defaultProps={
    isChecked :false,
}

export default React.memo(CartItem);