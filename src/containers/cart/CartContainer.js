import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getTestCartList } from '../../api/cart/cart';
import { Paths } from 'paths';
import styles from './Cart.module.scss';
import CartItemList from 'components/cart/CartItemList';
import CartModal from 'components/modal/EstmModal';
import produce from 'immer';
import PlusIcon from '../../components/svg/cart/PlusIcon';
import EqualsIcon from '../../components/svg/cart/EqualsIcon';
import CheckBox from '../../components/checkbox/CheckBox';
import Button from '../../components/button/Button';
import SquareCheckBox from '../../components/checkbox/SquareCheckBox';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
const cx = cn.bind(styles);

const CartContainer = () => {
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [allChecked, setAllChecked] = React.useState(false); //전체선택
    const [estm, setEstm] = React.useState(true); //견적서 발송
    const [cartList, setCartList] = React.useState([]); //장바구니
    const [total, setTotal] = React.useState(0); //총 주문금액
    const [delivery_cost, setCost] = React.useState(0); // 배달비
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    //장바구니 들고와서 check 추가
    const getCartListApi = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        const res = await getTestCartList(token);
        let len = Object.keys(res).length;
        let list = [];
        for (let i = 0; i < len - 1; i++) {
            list[i] = res[i];
            list[i].isChecked = false;
        }
        setCost(res.delivery_cost);
        setCartList(list);
        setLoading(false);
    }, []);

    const onChangeTotalPrice = useCallback(() => {
        setTotal(0);
        let total = 0;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].isChecked) {
                console.log(cartList[i].item.item_price);
                total += cartList[i].item.item_price;
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

    const onClickAllCheck = useCallback(
        (e) => {
            const newState = cartList.map((cart) => {
                return { ...cart, isChecked: e.target.checked };
            });
            setCartList(newState);
        },
        [cartList],
    );

    const onClickCheckChild = useCallback(
        (e) => {
            const index = e.target.id;
            setCartList(
                produce(cartList, (draft) => {
                    draft[index].isChecked = !draft[index].isChecked;
                }),
            );
        },
        [cartList],
    );

    //전체 선택인지 아닌지 여부 판단
    const onCompareAllChecked = useCallback(() => {
        for (let i = 0; i < cartList.length; i++) {
            console.log(cartList[i]);
            if (cartList[i].isChecked === false) {
                setAllChecked(false);
                return;
            }
        }
        setAllChecked(true);
        return;
    }, [cartList]);

    const goToOrder = () => history.push(Paths.ajoonamu.order);

    useEffect(() => {
        onCompareAllChecked();
        onChangeTotalPrice();
    }, [cartList, onChangeTotalPrice, onCompareAllChecked]);

    useEffect(() => {
        setLoading(true);
        getCartListApi();
    }, [getCartListApi]);

    const render = () => {
        return (
            <div className={styles['container']}>
                <div className={styles['title']}>장바구니</div>
                <div className={styles['bar']}>
                    <div className={styles['check']}>
                        <SquareCheckBox id={'allCheck'} text={'전체삭제'} />
                    </div>
                    <ButtonBase className={styles['select']}>선택삭제</ButtonBase>
                </div>
                <div className={styles['cart-list']}>
                    <CartItemList
                        allChecked={allChecked}
                        carts={cartList}
                        handleCheckChild={onClickCheckChild}
                    />
                </div>
                <div className={styles['finally']}>
                    <div className={styles['order-text']}>총 주문금액</div>
                    <div className={styles['order-price']}>64,000원</div>
                    <div className={styles['box']}>
                        <PlusIcon />
                    </div>
                    <div className={styles['order-text']}>배달비</div>
                    <div className={styles['order-price']}>5,000원</div>
                    <div className={styles['box']}>
                        <EqualsIcon />
                    </div>
                    <div className={cx('order-price', 'total')}>68,000원</div>
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
                    <Button onClick={onClickEstmOpen} toggle={true} title={'주문하기'}></Button>
                </div>
                <CartModal
                    open={open}
                    handleClose={handleClose}
                    order={goToOrder}
                />
            </div>
        );
    };
    return (
        <>{loading ? <div className={styles['load']}>로딩</div> : render()}</>
    );
};
export default CartContainer;
