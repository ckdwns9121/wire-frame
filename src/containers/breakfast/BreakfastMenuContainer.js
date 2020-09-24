import React, { useEffect, useState, useCallback } from 'react';

import { Paths } from 'paths';
import styles from './BreakfastMenu.module.scss';
import TabMenu from '../../components/tab/TabMenu';
import MenuItemList from '../../components/item/MenuItemList';
import Message from 'components/message/Message';
import { useHistory } from 'react-router';
import ShopBanner from '../../components/svg/shop/shop_banner.png';
import { useStore } from '../../hooks/useStore';
import Loading from '../../components/assets/Loading';
import bottomBanner from '../../components/svg/breakfast/bottomBanner.png';
import { ButtonBase } from '@material-ui/core';
import { getMenuList } from '../../api/menu/menu';
import AOS from 'aos';
import 'aos/dist/aos.css';

import CategoryMenu from '../../components/tab/CategoryMenu';

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

const BreakfastMenuContainer = ({ menu = '0' }) => {
    const user_token = useStore();

    const [menu_list, setMenuList] = useState([]);

    const new_category = [
        { ca_id: 1, ca_name: '샐러드', ca_order: 0, ca_use: 1 },
        { ca_id: 2, ca_name: '샌드위치', ca_order: 0, ca_use: 1 },
        { ca_id: 3, ca_name: '주먹밥', ca_order: 0, ca_use: 1 },
    ];

    const titleTab = [
        { name: '메뉴소개', url: `${Paths.ajoonamu.breakfast}/menu?tab=0` },
        { name: '조식구성', url: `${Paths.ajoonamu.breakfast}/configure` },
    ];
    const history = useHistory();
    const [titleIndex, setTitleIndex] = useState(0);

    const [tab_index, setTab] = useState(parseInt(menu));
    const [loading, setLoading] = useState(false);

    //메뉴 카테고리에 대한 탭
    const onChangeTabIndex = (e, index) => {
        setTab(index);
    };

    //큰 카테고리에 대한 탭
    const onChangeIndex = (e, index) => {
        setTitleIndex(index);
    };


    //메뉴 아이템을 클릭했을 시 상세보기 페이지로 푸쉬
    const onClickMenuItem = useCallback(
        (item_id) => {
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
        },
        [history],
    );

    //메뉴 리스트가 있으면 렌더 없으면 메시지 렌더
    const renderMenuList = useCallback(
        (ca_id) => {
            const index = menu_list.findIndex((item) => item.ca_id === ca_id);
            return (
                <>
                    {index !== -1 ? (
                        <MenuItemList
                            menuList={menu_list[index].items}
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
        [menu_list, onClickMenuItem],
    );
    //임의로 설정한 ca_id (메뉴분류 값) 을 가지고 실제 메뉴 불러오기
    const getProductList = useCallback(async () => {
        setLoading(true);
        if (user_token) {
            let arr = [];
            try {
                for (let i = 0; i < new_category.length; i++) {
                    const result = await getMenuList(
                        user_token,
                        new_category[i].ca_id,
                    );
                    const temp = { ca_id: new_category[i].ca_id, items: result };
                    arr.push(temp);
                }
                setMenuList(arr);
            } catch (e) {
                console.error(e);
            }
        }
        setLoading(false);
    }, [user_token, new_category]);

    // 아이템 카테고리가 존재하면 그 갯수만큼 패널 생성
    const renderContent = useCallback(() => {
        const list = new_category.map((category, index) => (
            <TabPanel
                key={category.ca_id}
                value={tab_index}
                index={index}
                children={<span>{renderMenuList(category.ca_id)}</span>}
            />
        ));
        return <>{list}</>;
    }, [new_category, tab_index, renderMenuList]);

    //마운트 되었을 시 메뉴 리스트 받아오기
    useEffect(() => {
        getProductList();
    }, []);

    //탭이 바뀌면 url 변경
    useEffect(() => {
        if (user_token) {
            history.replace(
                `${Paths.ajoonamu.breakfast}/menu?tab=${tab_index}`,
            );
        }
    }, [tab_index, history, user_token]);

    useEffect(() => {
        AOS.init({ duration: 1500 });
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
            <h1 className={styles['top-title']}>기업조식 메뉴</h1>
            <CategoryMenu
                tabs={titleTab}
                index={titleIndex}
                onChange={onChangeIndex}
            />
            <div className={styles['container']}>
                <div className={styles['content']}>
                    {titleIndex === 0 ? (
                        <>
                            <TabMenu
                                tabs={new_category}
                                index={tab_index}
                                onChange={onChangeTabIndex}
                            />
                            <div className={styles['shop']}>
                                {renderContent()}
                            </div>

                            <div
                                className={styles['bottom-banner']}
                                style={{
                                    backgroundImage:
                                        'url(' + bottomBanner + ')',
                                }}
                            >
                                <div
                                    className={styles['content']}
                                    data-aos="fade-up"
                                >
                                    <p className={styles['title']}>
                                        기업조식 정기배송 서비스
                                    </p>
                                    <p className={styles['text']}>
                                        하루의 시작은 샌달이 책임져드립니다
                                    </p>
                                    <div className={styles['button-area']}>
                                        <ButtonBase
                                            className={styles['button']}
                                        >
                                            상담문의
                                        </ButtonBase>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1></h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default BreakfastMenuContainer;
