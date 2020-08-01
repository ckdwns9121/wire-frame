import React, { useCallback, useEffect } from 'react';
import {getCartList} from '../../api/test';
import { useHistory } from 'react-router';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import CartItemList from 'components/cart/CartItemList';
import CartModal from 'components/asset/CartModal';
import produce from 'immer';

const initCarts = [
    {
        id: 1,
        menuName: "과일도시락",
        menuOption: "딸기추가 (1000)원, 토마토추가 (1000)원",
        menuCount: "5",
        menuPrice: "23000원",
        isChecked: false,
    },
    {
        id: 2,
        menuName: "그냥도시락zz",
        menuOption: "딸기추가 (500)원, 토마토추가 (1000)원",
        menuCount: "3",
        menuPrice: "33000원",
        isChecked: false,
    },
    {
        id: 3,
        menuName: "그냥도시락zz",
        menuOption: "딸기추가 (500)원, 토마토추가 (1000)원",
        menuCount: "3",
        menuPrice: "33000원",
        isChecked: false,
    },

];



const CartContainer = () => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [allChecked ,setAllChecked] = React.useState(false);
    const [esitChcked ,setEsitChcked] = React.useState(true);
    const [carts , setCarts] = React.useState(initCarts);

    useEffect(()=>{
        getList();
    },[])

    useEffect(()=>{
        haddleAllChecked();
    },[carts])


    const getList = useCallback(async()=>{
        const result = await getCartList();
        console.log(JSON.parse(result));
    })

    // 주문 설정하기 버튼 클릭
    const onClickOrder = () => {
        setOpen(true);
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    const handleAllChecked = useCallback((e)=>{
        const newState = carts.map(cart => {
            return {...cart ,isChecked : e.target.checked};
        })
        setCarts(newState)
    });

    const handleCheckChild =useCallback((e) =>{
        setCarts(
            produce(carts,draft =>{
                const cart = draft.find(t=>t.id ==e.target.id);
                cart.isChecked = !cart.isChecked;
            })
        );
 
    },[carts]);

    //전체 선택인지 아닌지 여부 판단
    const haddleAllChecked =()=>{

        for (let i = 0 ;i<carts.length;i++){
            console.log(carts[i]);
            if(carts[i].isChecked == false){
                setAllChecked(false);
                return ;
            }
        }
        setAllChecked(true);
        return;
    }

    const test =()=>{
        console.log(allChecked);
    }
    const goToOrder = () => history.push(Paths.ajoonamu.order);

    return (
        <>
            <Header />
            <Title mainTitle={"장바구니"} subTitle={"장바구니"} />
            <div className={styles['cart-page']}>
                <button onClick={test}>test</button>
                <div className={styles['bar']}>
                    <div className={styles['all-check']}>
                    <input type="checkbox" checked={allChecked} onClick={handleAllChecked} value="checkedall"></input><label>전체선택</label>
                    </div>
                    <div className={styles['select']}>
                        선택삭제
                    </div>
                </div>
                <div className={styles['cart-list']}>
                  <CartItemList allChecked ={allChecked} carts={carts}  handleCheckChild={handleCheckChild}/>
                </div>
                <div className={styles['finally']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                총 주문금액
                        </div>
                            <div className={styles['price']}>
                                30000
                        </div>
                        </div>
                        <div className={styles['finally-price']}>
                            <div className={styles['title']}>
                                배달비
                        </div>
                            <div className={styles['price']}>
                                3000
                        </div>
                        </div>
                        <div className={styles['order-text']}>
                            * 배달비는 거리에 따라 측정되며, 20만원 이상 결제시 배달비는 무료입니다.
                        </div>
                        <div className={styles['estm']}>
                            <div className={styles['title']}>
                                견적서 발송 여부
                           </div>
                            <div className={styles['check']}>
                                <input type="checkbox" checked={esitChcked}></input> 견적서 받음
                                <input type="checkbox" checked={!esitChcked}></input> 견적서 안받음
                            </div>
                        </div>
                        <div className={styles['btn']}>
                            <div className={styles['btn-name']} onClick={onClickOrder}>
                                주문하기
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <CartModal
                    open={open}
                    handleClose={handleClose}
                    order={goToOrder}
                />
        </>
    )
}
export default CartContainer;