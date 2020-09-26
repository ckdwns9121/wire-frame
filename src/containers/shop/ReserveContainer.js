import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TabMenu from '../../components/tab/TabMenu';
import MenuItemList from '../../components/item/MenuItemList';
import Message from 'components/message/Message';
import CustomItemList from '../../components/item/CustomItemList';
import PreferModal from '../../components/modal/PreferModal';
import { useHistory } from 'react-router';
import ShopBanner from '../../components/svg/shop/shop_banner.png';
import { useStore } from '../../hooks/useStore';
import Loading from '../../components/assets/Loading';

import {
    getPreferMenuList,
    getCustomMenuList,
    getMenuList,
} from '../../api/menu/menu';
import { getCategory } from '../../api/category/category';
import { get_catergory, get_menulist } from '../../store/product/product';
import ScrollTop from '../../components/scrollTop/ScrollToTop';
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

const ReserveContainer = ({ tab = '0' }) => {
    const { categorys, items } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(0); // 맞춤 가격
    const [endBudget, setEndBudget] = useState(0); // 맞춤 가격 끝
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [tab_index, setTab] = useState(parseInt(tab));
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [preferMenuList, setPreferMenuList] = useState([]);
    const handleOpen = () => setOpen(true);
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

    useEffect(() => {
        if (budget > endBudget) {
            setEndBudget(budget);
        }
    }, [budget, endBudget])

    const getProductList = useCallback(async () => {
        setLoading(true);

        if (categorys.length === 1) {
            const res = await getCategory();
            console.log(res);
            res.sort((a, b) => a.ca_id - b.ca_id);
            // 카테고리를 분류 순서로 정렬.
            const ca_list = res.filter ((item) =>item.ca_id !==12);
            console.log("필터");
            console.log(ca_list);
            dispatch(get_catergory(ca_list));
            let arr = [];
            for (let i = 0; i < ca_list.length; i++) {
                const result = await getMenuList(ca_list[i].ca_id);
                const temp = { ca_id: ca_list[i].ca_id, items: result };
                arr.push(temp);
            }
            arr.sort((a, b) => a.ca_id - b.ca_id);
            dispatch(get_menulist(arr));
        }

        setLoading(false);
    }, [categorys, dispatch]);

    const renderContent = useCallback(() => {
        const list = categorys.map((category, index) => (
            <TabPanel
                key={category.ca_id}
                value={tab_index}
                index={index}
                children={
                    <span>
                        {category.ca_id === 0 ? (
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
                            <>{renderMenuList(category.ca_id)}</>
                        )}
                    </span>
                }
            />
        ));

        return <>{list}</>;
    }, [categorys, preferMenuList, tab_index, renderMenuList, items]);

    const renderMenuList = useCallback(
        (ca_id) => {
            const index = items.findIndex((item) => item.ca_id === ca_id);
            return (
                <>
                    {index !== -1 ? (
                        <MenuItemList
                            menuList={items[index].items}
                            onClick={onClickMenuItem}
                        />
                    ) : (
                        <Message
                            msg={'추천드릴 메뉴 구성이 존재하지 않습니다.'}
                            src={true}
                            isButton={false}
                        />
                    )}
                </>
            );
        },
        [items, onClickMenuItem],
    );

    const onClickMenuItem = useCallback(
        (item_id) => {
            console.log(item_id);
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
        },
        [history],
    );

    useEffect(() => {
        getProductList();
    }, []);

    useEffect(() => {
        history.replace(`${Paths.ajoonamu.shop}?tab=${tab_index}`);
    }, [tab_index, history]);

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
                            index={tab_index}
                            onChange={onChangeIndex}
                        />
                    )}

                    <div className={styles['shop']}>
                        {items && renderContent()}
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
