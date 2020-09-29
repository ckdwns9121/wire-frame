import React, { useEffect, useState, useCallback,useRef } from 'react';
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
    getCustomMenuList,
    getMenuList,
} from '../../api/menu/menu';
import { getCategory } from '../../api/category/category';
import { get_catergory, get_menulist } from '../../store/product/product';
import { stringNumberToInt } from '../../lib/formatter';

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <>{children}</>}
        </div>
    );
}
const OFFSET = 0;
const LIMIT = 8;

const ReserveContainer = ({ tab = '0' }) => {
    const { categorys, items } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(0); // 맞춤 가격
    const [endBudget, setEndBudget] = useState(0); // 맞춤 가격 끝
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [tabIndex, setTab] = useState(parseInt(tab));
    const [loading, setLoading] = useState(false);
    const [preferMenuList, setPreferMenuList] = useState([]); //추천메뉴 리스트

    const [posts ,setPosts] = useState([]); //보여줄 배열
    const [isPaging ,setIsPaging] = useState(false); //페이징중인지
    const [offset , setOffset] = useState(8);
    const [isEndPage ,setIsEndPage] = useState(false);


    const handleOpen = () => setOpen(true); //test
    const handleClose = () => setOpen(false);

    const onChangeIndex = (e, index) => {
        setTab(index);
    };
    //주문 종류 선택
    const onChangeOrderType = (e) => {
        setOrderType(e.target.value);
    };

    const onClickCustomOrder = () => {
        setOpen(false);
        getCustomList();
    };

    const getCustomList = async () => {
        setLoading(true);
        try {
            const res = await getCustomMenuList();
            const test = await getPreferMenuList();
            console.log('추천메뉴');
            console.log(test);
            // console.log(res);
            setPreferMenuList(res);
        } catch {
            alert('오류!');
        }
        setLoading(false);
    };

    //전체 예산 입력
    const onChangeBudget = useCallback(e => {
        const value = stringNumberToInt(e.target.value);
        setBudget(value);
    }, []);
    const onChangeEndBudget = useCallback(e => {
        const value = stringNumberToInt(e.target.value);
        setEndBudget(value);
    }, []);


    const onClickMenuItem = useCallback(
        (item_id) => {
            console.log(item_id);
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
        },
        [history],
    );
    const getProductList = useCallback(async () => {
        setLoading(true);
        if (categorys.length === 1) {
            const res = await getCategory();
            res.sort((a, b) => a.ca_id - b.ca_id);
            // 카테고리를 분류 순서로 정렬.
            const ca_list = res.filter((item) => item.ca_id !== 12);

            dispatch(get_catergory(ca_list));
            let arr = [];
            for (let i = 0; i < ca_list.length; i++) {
                const result = await getMenuList(ca_list[i].ca_id , 0, LIMIT);
                const temp = { ca_id: ca_list[i].ca_id, items: result };
                arr.push(temp);
            }
            arr.sort((a, b) => a.ca_id - b.ca_id);
            dispatch(get_menulist(arr));
        }
        setLoading(false);
    }, [categorys, dispatch, offset]);

    const getMenuListApi = useCallback(async()=>{
        console.log('페이징 시작',tabIndex);
       
        try{
            if(tabIndex!==0 && categorys.length!==1){
            setIsPaging(true);
            const res = await getMenuList(categorys[tabIndex].ca_id , offset, LIMIT);
            console.log(res);
         
            if(res.length!==0){
                setOffset(offset+LIMIT) 
                const newState = posts.concat(res);
                console.log(newState);
                setPosts(newState);
            }
            setTimeout(() => {
                setIsPaging(false);
            }, 2000);
            }
        }  
        catch(e){
            console.error(e);

        }
    },[tabIndex,categorys,offset,posts]);

    const onScorll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        // console.log(scrollHeight);
        // console.log(scrollTop + clientHeight);
        let height = Math.round(scrollTop + clientHeight);
        if (height >= scrollHeight) {
            console.log('페이지 끝');
            setIsEndPage(true);
        }
        else{
            setIsEndPage(false);
        }
    };

    useEffect(()=>{
        history.replace(`${Paths.ajoonamu.shop}?tab=${tabIndex}`);
    },[history,tabIndex])
    useEffect(()=>{
        (items && tabIndex!==0) && setPosts(items[tabIndex-1].items);
    },[items,tabIndex])
    useEffect(()=>{
        setOffset(8);
    },[tabIndex])

    useEffect(() => {
        getProductList();
        window.addEventListener('scroll', onScorll, true);
        return () =>{
            console.log('언마운트');
            window.removeEventListener('scroll', onScorll);
        }
    }, []);

    useEffect(()=>{
        if(isEndPage && !isPaging){
            console.log(isEndPage);
            getMenuListApi();
        }
    },[isEndPage,tabIndex,isPaging])

    useEffect(()=>{
    console.log('오프셋 갱신', offset);
    },[offset])

    useEffect(() => {
        if (budget > endBudget) {
            setEndBudget(budget);
        }
    }, [budget, endBudget])

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
                                {preferMenuList.length !== 0 ? (
                                    <CustomItemList menuList={preferMenuList} />
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
                            { posts && <MenuItemList menuList={posts} onClick ={onClickMenuItem}/>}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <PreferModal
                open={open}
                handleClose={handleClose}
                itemType={orderType}
                onChangeType={onChangeOrderType}
                budget={budget}
                endBudget={endBudget}
                onChangeBudget={onChangeBudget}
                onChangeEndBudget={onChangeEndBudget}
                desireQuan={desireQuan}
                onClickCustomOrder={onClickCustomOrder}
            />
        </>
    );
};

export default ReserveContainer;
