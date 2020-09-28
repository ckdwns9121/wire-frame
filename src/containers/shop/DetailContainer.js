/*global kakao*/

import React, { useCallback, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Paths } from 'paths';
import styles from './Detail.module.scss';
import AdditionalList from '../../components/item/AdditionalList';
import { useHistory } from 'react-router';
import OtherUserMenuItemList from '../../components/item/OtherUserMenuItemList';
import { getOtherUserMenu } from '../../api/menu/menu';
import TabMenu from '../../components/tab/TabMenu';
import Count from '../../components/svg/counter/Count';
import CartMenuImg from '../../components/svg/cart/cart_menu.png';
import DetailImg from '../../components/svg/cart/detail_img.png';
import { ButtonBase } from '@material-ui/core';
import Loading from '../../components/assets/Loading';
import { numberFormat } from '../../lib/formatter';
import { addCartItem } from '../../api/cart/cart';
import {noAuthAddCart} from '../../api/noAuth/cart';
import { useStore } from '../../hooks/useStore';
import { getMenuInfo } from '../../api/menu/menu';
import { useModal } from '../../hooks/useModal';

import ScrollTop from '../../components/scrollTop/ScrollToTop';

const DetailContainer = ({ item_id }) => {

    const user_token = useStore(false);
    const openModal = useModal();
    
    const history = useHistory();
    const {addr1,addr2} = useSelector((state)=>(state.address));

    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [quanity, setQuanity] = useState(1);
    const [options, setOptions] = useState(null);
    const [option_total, setOptionTotal] = useState(0);

    const [other_menu_list, setOtherMenuList] = useState([]);
    const [index, setIndex ]= useState(0);
    const onChangeIndex = (e, index) => setIndex (index);

    
    //메뉴 디테일 정보 가져오기
    const getDetailMenu = async () => {
        console.log('디테일 정보 가져오기');
        setLoading(true);
        try {
            const res = await getMenuInfo(item_id);
            console.log(res);
            setMenu(res);
            setSuccess(true);
        } catch (e) {
            setError(true);
            alert('Error!');
        }
        setLoading(false);
    };
    
    //임의로 넣어준 다른사람이 본 메뉴
    const getOtherUserMenuApi = async () => {
        const res = await getOtherUserMenu();
        console.log(res);
        setOtherMenuList(res.data.query.items);
    };


    //장바구니 담기
    const onClickCart = useCallback(async () => {
        setLoading(true);
        setSuccess(false);
        if (user_token) {
            try {
                const res = await addCartItem(
                    user_token,
                    item_id,
                    options,
                    quanity,
                );
                console.log(res);
                setSuccess(true);
                openModal('장바구니에 담았습니다.','장바구니로 이동하시겠습니까?',
                ()=>{history.push(Paths.ajoonamu.cart)}, true
                )

            } catch (e) {
                alert('Error!');
            }
        }
        else {
            try {
                var geocoder = new kakao.maps.services.Geocoder();
                let lat, lng =null;

                //주소가 존재할 때
                if (addr1) {
                    geocoder.addressSearch(addr1, async function ( result, status,) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            console.log('좌표');
                            lat = result[0].y;
                            lng = result[0].x;
                            try {
                                console.log("장바구니 담기");
                                const res = await noAuthAddCart(item_id,options, quanity,lat, lng );
                                console.log(res);
                                const noAuthCartId = JSON.parse( localStorage.getItem('noAuthCartId'));
                                console.log(noAuthCartId);
                                //이미 담은 cart_id가 존재할 경우
                                if (noAuthCartId) {
                                    //기존 list에서 push
                                    noAuthCartId.push(res.data.query);
                                    //그리고 다시 저장
                                    localStorage.setItem('noAuthCartId',JSON.stringify(noAuthCartId));
                                }
                                else {
                                    // cart_id가 존재하지 않을 경우 배열의 형태로 push
                                    localStorage.setItem('noAuthCartId',JSON.stringify([res.data.query]));
                                }
                                openModal(
                                    '장바구니에 담았습니다.',
                                    '장바구니로 이동하시겠습니까?',
                                    () => {
                                        history.push(Paths.ajoonamu.cart);
                                    },
                                    true,
                                );
                            } catch (e) {
                                console.error(e);
                            }
                        } else {
                            console.log('검색 실패');
                        }
                    });
                }
                else{
                    openModal('배달지 주소가 설정되지 않았습니다.','배달지 주소를 설정하시려면 예를 눌러주세요',
                        ()=>{history.push(Paths.ajoonamu.address)}, true
                    )
                }
                setSuccess(true);
            } catch (e) {
                alert('Error!');
            }
        }
        setLoading(false);
    }, [history, item_id, options, quanity,user_token,addr1]);


    //옵션아이템 클릭
    const setOptionItem = useCallback(() => {
        const add_option = menu.options
            .filter((option) => option.check)
            .map((option) => option.option_id);
        setOptions(add_option);
    }, [menu]);


    //수량 변경
    const onDecrement = useCallback(() => {
        if (quanity > 1) setQuanity(quanity - 1);
    }, [quanity]);

    const onIncrement = useCallback(() => {
        setQuanity(quanity + 1);
    }, [quanity]);



    const onClickOptionItem = (id) => {
        const newOptionItem = menu.options.map((item) => {
            if (item.option_id === id) {
                item.check = !item.check;
                let option_price = item.option_price;
                let new_total = option_total;
                new_total += item.check ? option_price : option_price * -1;
                setOptionTotal(new_total);
            }
            return item;
        });
        setMenu({ ...menu }, { options: newOptionItem });
    };

    
    useEffect(() => {

        getDetailMenu();
    }, []);

    useEffect(()=>{
        getOtherUserMenuApi();
    },[])

    useEffect(() => {
        menu && setOptionItem();
    }, [menu, setOptionItem]);

    return (
        <ScrollTop>
        <div className={styles['min-height']}>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    {success && !error && (
                        <div className={styles['container']}>
                            <div className={styles['menu-info']}>
                                <div className={styles['menu-view']}>
                                    <img src={CartMenuImg} alt={'메뉴'} />
                                </div>
                                <div className={styles['item-info']}>
                                    <div className={styles['item-name']}>
                                        {menu.item.item_name}
                                    </div>
                                    <div className={styles['item-text']}>
                                        {menu.item.item_sub}
                                    </div>
                                    <div className={styles['item-price']}>
                                        {numberFormat(menu.item.item_price)}원
                                    </div>
                                    <div className={styles['option-text']}>
                                        추가선택
                                    </div>
                                    <div
                                        className={
                                            styles['item-additional-list']
                                        }
                                    >
                                        <AdditionalList
                                            itemList={menu.options}
                                            onClickAddItem={onClickOptionItem}
                                        />
                                    </div>

                                    <div className={styles['box']}>
                                        <div className={styles['counter']}>
                                            <div className={styles['value']}>
                                                {quanity}
                                            </div>
                                            <div className={styles['control']}>
                                                <ButtonBase
                                                    className={
                                                        styles['increment']
                                                    }
                                                    onClick={onIncrement}
                                                >
                                                    <Count plus={true} />
                                                </ButtonBase>
                                                <ButtonBase
                                                    className={
                                                        styles['decrement']
                                                    }
                                                    onClick={onDecrement}
                                                >
                                                    <Count plue={false} />
                                                </ButtonBase>
                                            </div>
                                        </div>
                                        <div className={styles['btn']}>
                                            <ButtonBase onClick={onClickCart}>
                                                {`${quanity}개 담기(${numberFormat(
                                                    (menu.item.item_price +
                                                        option_total) *
                                                        quanity,
                                                )}원)`}
                                            </ButtonBase>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['content']}>
                                <div className={styles['title']}>
                                    다른 고객들이 함께 본 상품
                                </div>
                                <div className={styles['other-menu-list']}>
                                    {other_menu_list.length !== 0 && (
                                        <OtherUserMenuItemList
                                            menu_list={other_menu_list}
                                        />
                                    )}
                                </div>
                                <div className={styles['detail-info']}>
                                    <TabMenu
                                        tabs={[
                                            { name: '상세정보' },
                                            { name: '영양성분표' },
                                        ]}
                                        index={index}
                                        onChange={onChangeIndex}
                                    />
                                    {index ===  0 && 
                                    
                                    <div className={styles['detail-menu-view']}>
                                    <div className={styles['detail-img']}>
                                        <img
                                            src={DetailImg}
                                            alt="상세 이미지"
                                        />
                                    </div>
                                    <div className={styles['detail-text']}>
                                        <div className={styles['title']}>
                                            {menu && menu.item.item_name}
                                        </div>
                                        <div className={styles['sub-title']}>
                                            {menu && menu.item.item_sub}
                                        </div>
                                        <div className={styles['explan']}>
                                            제철 과일은 종류에 따라 당도가 높고,
                                            가장 맛있는 맛을 내기 때문에 알맞은
                                            때에 먹어주는 것이 좋습니다.
                                            <br />
                                            (쿠키 추가 가능 개당 1천 원) (불고기
                                            샌드위치, 크랜베리 허니에그 샌드위치
                                            변경가능 - 변경 시 단가 변동)
                                            {menu && menu.item.item_caution}
                                        </div>
                                    </div>
                                    </div>

                                    }
                                    {index ===1 && 
                                         <div className={styles['detail-view']}>
                                            <div className={styles['table']}>
                                                 <Cell tr={'중량(g)'} td={menu && menu.item.option_1} />
                                                <Cell  tr={'열량(kcal)'} td={menu && menu.item.option_2} />
                                                <Cell tr={'당류(g)'} td={menu && menu.item.option_3} />
                                                <Cell tr={'단백질(g)'} td={menu && menu.item.option_4} />
                                                <Cell tr={'포화지방(g)'} td={menu && menu.item.option_5} />
                                                <Cell tr={'나트륨(mg)'}td={menu && menu.item.option_6}/>
                                            </div>
                                         </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
        </ScrollTop>
    );
};

function Cell({ tr, td }) {
    return (
        <div className={styles['cell']}>
            <div className={styles['tr']}>{tr}</div>
            <div className={styles['td']}>{td}</div>
        </div>
    );
}

export default DetailContainer;
