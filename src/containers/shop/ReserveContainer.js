import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paths } from 'paths';
import styles from './Reserve.module.scss';
import TabMenu from '../../components/tab/TabMenu';
import MenuItemList from '../../components/item/MenuItemList';
import Message from 'components/message/Message';
import CustomItemList from 'components/item/CustomItemList';
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

const tabInit = [
    {
        url: `${Paths.ajoonamu.shop}?menu=0`,
        name: '추천메뉴',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=1`,
        name: '분류1',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=2`,
        name: '분류2',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=3`,
        name: '분류3',
    },
    {
        url: `${Paths.ajoonamu.shop}?menu=4`,
        name: '분류4',
    },
];

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

const ReserveContainer = ({ menu = '0' }) => {
    const user_token = useStore();
    const { categorys, items } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(0); // 맞춤 가격
    const [endBudget, setEndBudget] = useState(0); // 맞춤 가격 끝
    const [desireQuan, setDesireQuan] = useState(0); //희망수량
    const [orderType, setOrderType] = useState('reserve'); //사용자 선택 값 1.예약주문 2.배달주문
    const [tab_index, setTab] = useState(parseInt(menu));
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [preferMenuList, setPreferMenuList] = useState([]);
    const [menuList, setMenuList] = useState([]);
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
        const res = await getCustomMenuList();
        setPreferMenuList(res);
        setLoading(false);
    };

    //전체 예산 입력
    const onChangeBudget = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setBudget(e.target.value);
        }
    };

    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        setOpen(false);
    };

    const getProductList = useCallback(async () => {
        setLoading(true);

        if (user_token && categorys.length === 1) {
            const res = await getCategory(user_token);
            res.sort((a, b) => a.ca_id - b.ca_id);
            console.log(res);
            // 카테고리를 분류 순서로 정렬.
            dispatch(get_catergory(res));
            let arr = [];
            for (let i = 0; i < res.length; i++) {
                const result = await getMenuList(user_token, res[i].ca_id);
                const temp = { ca_id: res[i].ca_id, items: result };
                arr.push(temp);
            }
            arr.sort((a, b) => a.ca_id - b.ca_id);
            dispatch(get_menulist(arr));
        }

        setLoading(false);
    }, [categorys, dispatch, user_token]);

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
            console.log(items);
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
        [items,onClickMenuItem],
    );

    const onClickMenuItem = useCallback((item_id) =>{
        console.log(item_id);
        history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
    },[history]);

    useEffect(() => {
        getProductList();
    }, []);


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
                onChangeBudget={onChangeBudget}
                desireQuan={desireQuan}
                onClickCustomOrder={onClickCustomOrder}
            />
        </>
    );
};

export default ReserveContainer;
