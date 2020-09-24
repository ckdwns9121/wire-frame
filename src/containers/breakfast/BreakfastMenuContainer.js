import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

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
import { get_menulist } from '../../store/product/product';
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

    const history = useHistory();

    const [tab_index, setTab] = useState(parseInt(menu));
    const [loading, setLoading] = useState(false);

    const onChangeIndex = (e, index) => {
        setTab(index);
    };

    const getProductList = useCallback(async () => {
        setLoading(true);

        if (user_token) {
            let arr = [];
            for (let i = 0; i < new_category.length; i++) {
                const result = await getMenuList(
                    user_token,
                    new_category[i].ca_id,
                );
                console.log(result);
                const temp = { ca_id: new_category[i].ca_id, items: result };
                arr.push(temp);
            }
            setMenuList(arr);
        }

        setLoading(false);
    }, [user_token, new_category]);

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
    }, [new_category, tab_index, renderMenuList, menu_list]);

    const renderMenuList = useCallback(
        (ca_id) => {
            const index = menu_list.findIndex((item) => item.ca_id === ca_id);
            console.log(index);
            console.log(menu_list);
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
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div className={styles['title']}>기업조식 메뉴</div>
                    {new_category.length !== 1 && (
                        <TabMenu
                            tabs={new_category}
                            index={tab_index}
                            onChange={onChangeIndex}
                        />
                    )}

                    <div className={styles['shop']}>
                        {new_category && renderContent()}
                    </div>
                </div>

                <div className={styles['area']}>
                    <div className={styles['container']}>
                        <div
                            className={styles['bottom-banner']}
                            style={{
                                backgroundImage: 'url(' + bottomBanner + ')',
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
                                    <ButtonBase className={styles['button']}>
                                        상담문의
                                    </ButtonBase>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BreakfastMenuContainer;
