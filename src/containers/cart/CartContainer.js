import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getCartList,deleteCartItem } from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import CartItemList from '../../components/cart/CartItemList';
import CartModal from 'components/modal/EstmModal';
import produce from 'immer';
import PlusIcon from '../../components/svg/cart/PlusIcon';
import EqualsIcon from '../../components/svg/cart/EqualsIcon';
import CheckBox from '../../components/checkbox/CheckBox';
import Button from '../../components/button/Button';
import SquareCheckBox from '../../components/checkbox/SquareCheckBox';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import Loading from '../../components/assets/Loading';
import {useStore} from '../../hooks/useStore';
import { numberFormat } from '../../lib/formatter';
import Message from '../../components/message/Message';

const cx = cn.bind(styles);

const CartContainer = () => {
    const history = useHistory();

    const user_token = useStore();
    const [open, setOpen] = React.useState(false);
    const [allChecked, setAllChecked] = React.useState(false); //전체선택
    const [estm, setEstm] = React.useState(true); //견적서 발송
    const [cartList, setCartList] = React.useState([]); //장바구니
    const [total, setTotal] = React.useState(0); //총 주문금액
    const [delivery_cost, setCost] = React.useState(0); // 배달비
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);


    const onChangeAllCheck = (e)=>{
        setAllChecked(e.target.checked);
    }
    const handleIncrement = useCallback(index => {
        console.log(index);
        setCartList(
            produce(cartList, (draft) => {
                draft[index].item.item_quanity++;
            }),
        );
    }, [cartList]);
    const handleDecrement = useCallback(index => {
        console.log(index);
        setCartList(
            produce(cartList, (draft) => {
                const item_quanity = draft[index].item.item_quanity;
                if (item_quanity > 1) {
                    draft[index].item.item_quanity--;
                }
            }),
        );
    }, [cartList]);

    const handleDelete = useCallback(async cart_id => {
        if (user_token) {
            const res = await deleteCartItem(user_token, cart_id);
            console.log(res);
        }
        setCartList(list => list.filter(({ item }) => cart_id.indexOf(item.cart_id) === -1))
    }, [user_token]);

    //장바구니 들고와서 check 추가
    const getCartListApi = useCallback(async () => {
        setLoading(true);

        if (user_token) {
            const res = await getCartList(user_token);
            console.log(res);
            let len = Object.keys(res).length;
            let list = [];
            for (let i = 0; i < len - 2; i++) {
                list[i] = res[i];
                list[i].isChecked = true;
            }
            setCost(res.delivery_cost);
            setCartList(list);
            setAllChecked(true); //나중에 빼야함
        }
        setLoading(false);
    }, [user_token]);

    const onChangeTotalPrice = useCallback(() => {

        let total = cartList.reduce((prev, { item }) => {
            const { item_price, item_quanity } = item;
            return prev + (item_price * item_quanity);
        }, 0);

        for(let i=0 ;i<cartList.length;i++){
            const {options , item} = cartList[i];
            console.log(options);
            console.log(item);
            for(let j=0 ;j <options.length;j++){
                const {option_price} = options[j];
                total += option_price * item.item_quanity;
                console.log(total);
            }
        }
        
        setTotal(total);
    }, [cartList]);


    const onChangeEstm = useCallback(e => setEstm(true), []);
    const onChangeNotEstm = useCallback(e => setEstm(false), []);
    const onClickEstmOpen = () => {
        setOpen(true);
    };

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    const onClickAllCheck = useCallback((e) => {
        setAllChecked(e.target.checked);
        const newState = cartList.map((cart) => {
            return { ...cart, isChecked:e.target.checked };
        });
        setCartList(newState);
    }, [cartList]);

    const onClickCheckChild = useCallback(
        (id) => {
            console.log(id);;

            setCartList(
                produce(cartList, (draft) => {
                    draft[id].isChecked = !draft[id].isChecked;
                }),
            );
        },
        [cartList],
    );

    //전체 선택인지 아닌지 여부 판단
    const onCompareAllChecked = useCallback(() => {

        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].isChecked === false) {
                setAllChecked(false);
                return;
            }
        }
        setAllChecked(true);
        return;
    }, [cartList]);

    const onClickOrder = useCallback(() => history.push(Paths.ajoonamu.order), [history]);

    useEffect(onChangeTotalPrice, [onChangeTotalPrice]);

    useEffect(() => {
        getCartListApi();
    }, [getCartListApi]);


    useEffect(()=>{
        onCompareAllChecked();
    },[cartList]);

  
    const render = () => {
        return (
            <div className={styles['container']}>
                <div className={styles['title']}>장바구니</div>
                {cartList.length!==0 ? 
                <>
            
            <div className={styles['bar']}>
                    <div className={styles['check']}>
                        <SquareCheckBox id={'allCheck'} text={'전체삭제'}  check={allChecked} onChange ={onClickAllCheck}/>
                    </div>
                    <ButtonBase className={styles['select']}>선택삭제</ButtonBase>
                </div>
                <div className={styles['cart-list']}>
                    <CartItemList
                        allChecked={allChecked}
                        carts={cartList}
                        handleCheckChild={onClickCheckChild}
                        handleIncrement= {handleIncrement}
                        handleDecrement= {handleDecrement}
                        handleDelete={handleDelete}
                    />
                </div>
                <div className={styles['finally']}>
                    <div className={styles['order-text']}>총 주문금액</div>
                    <div className={styles['order-price']}>
                    {numberFormat(total)}원

                    </div>
                    <div className={styles['box']}>
                        <PlusIcon />
                    </div>
                    <div className={styles['order-text']}>배달비</div>
                    <div className={styles['order-price']}>{numberFormat(delivery_cost)}원</div>
                    <div className={styles['box']}>
                        <EqualsIcon />
                    </div>
                    <div className={cx('order-price', 'total')}>{numberFormat(parseInt(delivery_cost) + parseInt(total))}원</div>
                </div>
                <div className={styles['order-text']}>
                    * 배달비는 거리에 따라 측정되며, 20만원 이상 결제시 배달비는
                    무료입니다.
                </div>
                <div className={styles['estm-box']}>
                    <div className={styles['estm-title']}>견적서 발송 여부</div>
                    <div className={styles['estm-check']}>
                        <div className={styles['chk-box']}>
                            <CheckBox
                                id={'check1'}
                                text={'견적서를 받고싶습니다.'}
                                check={estm}
                                onChange={onChangeEstm}
                            />
                        </div>
                        <div className={styles['chk-box']}>
                            <CheckBox
                                id={'check2'}
                                text={'견적서를 받지 않아도 됩니다.'}
                                check={!estm}
                                onChange={onChangeNotEstm}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['order-btn']}>
                    <Button onClick={estm ? onClickEstmOpen :onClickOrder } toggle={true} title={'주문하기'}></Button>
                </div>
                <CartModal
                    open={open}
                    handleClose={handleClose}
                    order={onClickOrder}
                />
            
                </> :

                (
                    <Message
                    msg={"장바구니가 비었습니다."}
                    buttonName={'주문하러 가기'}
                    isButton={true}
                    onClick={()=>history.push(Paths.ajoonamu.shop)}
                    />
                )
            
            }

            </div>
        );
    };
    return (
        <div className={styles['load']}>{loading ? <Loading open ={loading}/> : render()}</div>
    );
};
export default CartContainer;
