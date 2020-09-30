import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TabMenu from '../../components/tab/TabMenu';
import MenuItemList from '../../components/item/MenuItemList';
import Message from 'components/assets/Message';
import CustomItemList from '../../components/item/CustomItemList';
import PreferModal from '../../components/modal/PreferModal';
import { useHistory } from 'react-router';
import ShopBanner from '../../components/svg/shop/shop_banner.png';
import Loading from '../../components/assets/Loading';

import {
    getPreferMenuList,
    getMenuList,
} from '../../api/menu/menu';
import { getCategory } from '../../api/category/category';
import { get_catergory, get_menulist, add_menuitem } from '../../store/product/product';
import { stringNumberToInt } from '../../lib/formatter';
import { useScroll } from '../../hooks/useScroll';

const OFFSET = 8;
const LIMIT = 8;

const ReserveContainer = ({ tab = '0' }) => {
    const { categorys, items } = useSelector((state) => state.product);
    const { addr1 } = useSelector((state) => state.address);
    const { store } = useSelector((state) => state.store);
    const dispatch = useDispatch();

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(0); // 맞춤 가격
    // const [endBudget, setEndBudget] = useState(0); // 맞춤 가격 끝
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [tabIndex, setTab] = useState(parseInt(tab));
    const [loading, setLoading] = useState(false);
    const [preferList, setPreferMenuList] = useState([]); //추천메뉴 리스트
    const [generalList, setGeneralMenuList] = useState([]); //추천메뉴 리스트

    const { isScrollEnd } = useScroll(loading);
    const [posts, setPosts] = useState([]); //보여줄 배열
    const [isPaging, setIsPaging] = useState(false); //페이징중인지
    const [offset, setOffset] = useState(8);
    const handleOpen = () => setOpen(true); //test
    const handleClose = () => setOpen(false);

    const onChangeIndex = (e, index) => {
        setTab(index);
    };
    //주문 종류 선택
    const onChangeOrderType = (e) => {
        setOrderType(e.target.value);
    };

    //추천메뉴 설정
    const onClickCustomOrder = () => {
        setOpen(false);
        getCustomList();
    };

    // 사용자 추천 메뉴들고오기
    const getCustomList = useCallback(async () => {
        setLoading(true);
        try {
            // const res = await getCustomMenuList(); 임시데이터
            const res = await getPreferMenuList(0, 100, 0, 100, 1, budget, desireQuan, addr1, store.shop_id);
            setPreferMenuList(res.items_prefer);
            setGeneralMenuList(res.items_general);
        } catch {
            alert('오류!');
        }
        setLoading(false);
    }, [budget, desireQuan, addr1, store]);

    //전체 예산 입력
    const onChangeBudget = useCallback((e) => {
        const value = stringNumberToInt(e.target.value);
        setBudget(value);
    }, []);

    // const onChangeEndBudget = useCallback((e) => {
    //     const value = stringNumberToInt(e.target.value);
    //     setEndBudget(value);
    // }, []);

    const onClickMenuItem = useCallback(
        (item_id) => {
            console.log(item_id);
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
            sessionStorage.setItem('offset', offset);
        },
        [history, offset],
    );

    //첫 로딩시 메뉴 받아오기
    const getCategoryList = useCallback(async () => {
        setLoading(true);

        //카테고리 길이가 1이면 받아오기.   
        if (categorys.length === 1) {
            const res = await getCategory();
            // res.sort((a, b) => a.ca_id - b.ca_id);
            // 카테고리를 분류 순서로 정렬.
            let ca_list = res.filter((item) => item.ca_id !== 12); //이거 나중에 뺴야함.
            dispatch(get_catergory(ca_list));


            // arr.sort((a, b) => a.ca_id - b.ca_id);
            // dispatch(get_menulist(arr));
        }
        setLoading(false);
    }, []);



    //첫 로딩시 메뉴 받아오기
    const getProductList = useCallback(async () => {
        setLoading(true);

        try {
            // 카테고리별로 메뉴 리스트 받아오기.
            let arr = [];
            if (categorys.length !== 1 && store && !items) {
                for (let i = 1; i < categorys.length; i++) {
                    const { ca_id } = categorys[i];
                    const result = await getMenuList(ca_id, 0, LIMIT, store.shop_id);
                    const temp = { ca_id: ca_id, items: result.data.query.items };
                    arr.push(temp);
                }
                dispatch(get_menulist(arr));
            }
        }
        catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [categorys, store, items]);



    //오프셋이 바뀌었을때 페이지네이션으로 메뉴를 불러오는 함수.
    const PageNationMenuList = useCallback(async () => {
        console.log('페이지 네이션');
        if (!loading) {
            try {
                console.log('들어옴');

                //현재 탭이 추천메뉴 탭이 아니고, 카테고리를 받아오고난뒤, 아이템과 스토어가  있으면 실행
                if (tabIndex !== 0 && categorys.length !== 1 && items && store) {
                    setIsPaging(true);
                    const res = await getMenuList(
                        categorys[tabIndex].ca_id,
                        offset,
                        LIMIT,
                        store.shop_id
                    );
                    // console.log(res);

                    const get_list = res.data.query.items;
                    if (get_list.length !== 0) {
                        setOffset(offset + LIMIT);
                        dispatch(
                            add_menuitem({
                                ca_id: categorys[tabIndex].ca_id,
                                items: get_list,
                            }),
                        );
                    }
                    setTimeout(() => {
                        setIsPaging(false);
                    }, 1000);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }, [tabIndex, categorys, offset, items, loading, store, dispatch]);


    //첫 로딩시 카테고리 셋팅
    useEffect(() => {
        getCategoryList();
        window.scrollTo(0, 0);
    }, [getCategoryList]);

    // 첫 로딩시 메뉴 셋팅
    useEffect(() => {
        getProductList();
    }, [getProductList])

    //탭 바뀌었을때 오프셋 갱신
    useEffect(() => {
        setOffset(OFFSET);
    }, [tabIndex]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const url = JSON.parse(sessionStorage.getItem('url'));
            if (url) {
                //이전 페이지가 상품페이지라면 오프셋 유지.
                if (url.prev === '/product') {
                    const OS = sessionStorage.getItem('offset');
                    if (OS) {
                        setOffset(parseInt(OS));
                    }
                }
            }
            setLoading(false);
        }, 100);
    }, []);

    //로딩 완료 되었을 때 스크롤 위치로 이동.
    useEffect(() => {
        const scrollTop = sessionStorage.getItem('scrollTop');
        const url = JSON.parse(sessionStorage.getItem('url'));
        if (url) {
            //이전 주소가 상품페이지라면 스크롤 유지
            if (url.prev === '/product') {
                console.log('스크롤 이동');
                window.scrollTo(0, scrollTop);
            }
        }
    }, [loading]);

    // 탭 인덱스로 URL 이동c
    useEffect(() => {
        history.replace(`${Paths.ajoonamu.shop}?tab=${tabIndex}`);
    }, [history, tabIndex]);

    //아이템과 인덱스가 변했을 시 보여줄 리스트 갱신.
    useEffect(() => {
        items && tabIndex !== 0 && setPosts(items[tabIndex - 1].items);
    }, [items, tabIndex]);

    //스크롤 끝과 페이징중인지 확인후 페이지네이션 실행.
    useEffect(() => {
        if (isScrollEnd && !isPaging) {
            PageNationMenuList();
        }
    }, [isScrollEnd]);

    // useEffect(() => {
    //     if (budget > endBudget) {
    //         setEndBudget(budget);
    //     }
    // }, [budget, endBudget]);

    const renderPost = useCallback(() => {
        // console.log(offset +'으로 렌더');
        return (
            <>
                {posts && (
                    <MenuItemList
                        menuList={posts.slice(0, offset)}
                        onClick={onClickMenuItem}
                    />
                )}
            </>
        );
    }, [posts, offset, onClickMenuItem]);

    return (
        <>
            {loading && <Loading open={loading} />}
            <div className={styles['banner']}>
                <img
                    className={styles['shop-banner']}
                    src={ShopBanner}
                    alt="banner"
                />
            </div>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['title']}>예약주문 메뉴리스트</div>
                    {store ? <>
                        {categorys.length !== 1 && (
                            <TabMenu
                                tabs={categorys}
                                index={tabIndex}
                                onChange={onChangeIndex}
                            />
                        )}

                        <div className={styles['shop']}>
                            {tabIndex === 0 ? (
                                <>
                                    {preferList.length !== 0 ? (
                                        <>
                                         <MenuItemList menuList={preferList} onClick={onClickMenuItem} />
                                         <MenuItemList menuList={generalList} onClick={onClickMenuItem} />
                                        </>
                                    ) : (
                                            <Message
                                                msg="전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."
                                                isButton={true}
                                                buttonName={'맞춤주문 설정하기'}
                                                onClick={handleOpen}
                                                src={false}
                                            />
                                        )}
                                </>
                            ) : (
                                    <>
                                        {renderPost()}
                                    </>
                                )}
                        </div>

                    </> : <Message
                            msg={
                                '주소지가 설정되지 않았습니다.'
                            }
                            src={true}
                            isButton={true}
                            buttonName={'주소지 설정하기'}
                            onClick={() => history.push(Paths.ajoonamu.address)}
                        />
                    }

                </div>
            </div>
            <PreferModal
                open={open}
                handleClose={handleClose}
                itemType={orderType}
                onChangeType={onChangeOrderType}
                budget={budget}
                // endBudget={endBudget}
                onChangeBudget={onChangeBudget}
                // onChangeEndBudget={onChangeEndBudget}
                desireQuan={desireQuan}
                onClickCustomOrder={onClickCustomOrder}
            />
        </>
    );
};

export default ReserveContainer;
