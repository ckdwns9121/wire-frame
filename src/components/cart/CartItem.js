import React from 'react';
import PropsTypes from 'prop-types';
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import Menu1 from '../svg/menu/menu1.png';
import CloseIcon from '../svg/modal/CloseIcon';
import SquareCheckBox from '../../components/checkbox/SquareCheckBox';
import Count from '../../components/svg/counter/Count';
import { IconButton } from '@material-ui/core';
import { numberFormat } from '../../lib/formatter';

// 메뉴이름, 추가옵션 , 수량 ,가격 ,이미지 ,구매확정

const CartItem = (props) => {
    const { id } = props;
    const { item_name, item_price, item_quanity ,cart_id} = props.item;
    const options = props.options;


    return (
        <div className={styles['cart-item']}>
            <div className={styles['check-box']}>
                <div className={styles['check']}>
                    <SquareCheckBox 
                    check={props.isChecked}
                    onChange={()=>props.handleCheckChild(id)}
                    id={id}
                    />
                </div>
            </div>
            <div className={styles['menu-info']}>
                <div className={styles['menu-img']}>
                    <img src={Menu1} alt="menu" />
                </div>
                <div className={styles['menu-value']}>
                    <div className={styles['menu-name-price']}>
                        {item_name} <span>{numberFormat(item_price * item_quanity)}</span>원
                    </div>
                    <div className={styles['menu-option']}>
                        추가선택:
                        {options.length !== 0
                            ? options.map((op) => op.option_name)
                            : '없음'}
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['box-item']}>
                            <IconButton className={styles['opert']} onClick={()=>props.handleDecrement(id)}>
                                <Count plus={false} />
                            </IconButton>
                            <div className={styles['value']}>{item_quanity}</div>
                            <IconButton className={styles['opert']}onClick={()=>props.handleIncrement(id)}>
                                <Count plus={true} />
                            </IconButton>
                        </div>
                        <div className={styles['box-item']}>수량 변경</div>
                    </div>
                </div>
            </div>
            <div className={styles['menu-price']}>
            {numberFormat(item_price * item_quanity)} 원

            </div>
            <div className={styles['close-box']}  onClick={() => props.handleDelete([cart_id])}>
                <CloseIcon black={true} />
            </div>
        </div>
    );
};

CartItem.PropsTypes = {
    isChecked: PropsTypes.bool,
};
CartItem.defaultProps = {
    isChecked: false,
};

export default React.memo(CartItem);
