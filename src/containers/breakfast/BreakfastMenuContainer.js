import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paths } from 'paths';
import styles from './BreakfastMenu.module.scss';
import TabMenu from '../../components/tab/TabMenu';
import MenuItemList from '../../components/item/MenuItemList';
import Message from 'components/assets/Message';
import { useHistory } from 'react-router';
import ShopBanner from '../../components/svg/shop/shop_banner.png';
import Loading from '../../components/assets/Loading';
import bottomBanner from '../../components/svg/breakfast/bottomBanner.png';
import { ButtonBase } from '@material-ui/core';

import basicBanner from '../../components/svg/breakfast/basic.png';
import plusBanner from '../../components/svg/breakfast/plus.png';
import premiumBanner from '../../components/svg/breakfast/premium.png';

import SampleMenu from '../../components/svg/breakfast/sandal_menu.png';

import CategoryMenu from '../../components/tab/CategoryMenu';
import Configure from '../../components/breakfast/Configure';
import {
    getBreakCategory,
    getBreakMenu,
} from '../../api/break_fast/break_fast';
import { get_catergory, get_menulist } from '../../store/product/braekfast';
import { useScroll } from '../../hooks/useScroll';

const OFFSET = 8;
const LIMIT = 8;

const BreakfastMenuContainer = ({ tab = '0' }) => {
    const { categorys, items } = useSelector((state) => state.breakfast);
    const dispatch = useDispatch();

    const titleTab = [
        { name: '메뉴소개', url: `${Paths.ajoonamu.breakfast}/menu?tab=0` },
        { name: '조식구성', url: `${Paths.ajoonamu.breakfast}/configure` },
    ];
    const history = useHistory();

    const { isScrollEnd } = useScroll(loading);
    const [isPaging, setIsPaging] = useState(false); //페이징중인지
    const [offset, setOffset] = useState(8);

    const [titleIndex, setTitleIndex] = useState(0);

    const [tabIndex, setTab] = useState(parseInt(tab));
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    //메뉴 카테고리에 대한 탭
    const onChangeTabIndex = (e, index) => {
        setTab(index);
    };

    //큰 카테고리에 대한 탭
    const onChangeIndex = (e, index) => {
        setTitleIndex(index);
    };

    //카테고리를 받아와서 디스패치.
    const callBreakCategoryApi = async () => {
        setLoading(true);
        try {
            if (categorys.length === 0) {
                const res = await getBreakCategory();
                console.log(res);
                dispatch(get_catergory(res.data.query.categorys));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    //카테고리가 있으면 메뉴 불러와서 스토어에 저장
    const callBreakMenuList = useCallback(async () => {
        setLoading(true);
        let arr = [];
        try {
            if (!items && categorys.length !== 0) {
                for (let i = 0; i < categorys.length; i++) {
                    const res = await getBreakMenu(categorys[i].ca_id);
                    const { query } = res.data;
                    const temp = {
                        ca_id: categorys[i].ca_id,
                        items: query.items,
                    };
                    arr.push(temp);
                }
                dispatch(get_menulist(arr));
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }, [categorys, items]);

    //메뉴 아이템을 클릭했을 시 상세보기 페이지로 푸쉬
    const onClickMenuItem = useCallback(
        (item_id) => {
            history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
            sessionStorage.setItem('offset', offset);
        },
        [history, offset],
    );

    //첫 로딩 되었을 시 메뉴 리스트 받아오기
    useEffect(() => {
        callBreakCategoryApi();
        window.scrollTo(0, 0);
    }, []);

    //탭 바뀌었을때 오프셋 갱신
    useEffect(() => {
        setOffset(OFFSET);
    }, [tabIndex]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const url = JSON.parse(sessionStorage.getItem('url'));
            console.log(url);
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
                console.log(scrollTop);
                window.scrollTo(0, scrollTop);
            }
        }
    }, [loading]);

    useEffect(() => {
        callBreakMenuList();
    }, [callBreakMenuList]);

    //탭이 바뀌면 url 변경
    useEffect(() => {
        history.replace(`${Paths.ajoonamu.breakfast}/menu?tab=${tabIndex}`);
    }, [tabIndex, history]);

    useEffect(() => {
        if (items) {
            setPosts(items[tabIndex].items);
        }
    }, [tabIndex, items]);

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
            {titleIndex === 0 ? (
                <div className={styles['container']}>
                    <div className={styles['content']}>
                        {categorys.length !== 0 && (
                            <TabMenu
                                tabs={categorys}
                                index={tabIndex}
                                onChange={onChangeTabIndex}
                            />
                        )}

                        <div className={styles['shop']}>
                            {
                                <>
                                    {posts.length !== 0 ? (
                                        <MenuItemList
                                            menuList={posts}
                                            onClick={onClickMenuItem}
                                        />
                                    ) : (
                                        <Message
                                            msg={
                                                '추천드릴 메뉴 구성이 존재하지 않습니다.'
                                            }
                                            src={true}
                                            isButton={false}
                                        />
                                    )}
                                </>
                            }
                        </div>

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
                                    <ButtonBase
                                        className={styles['button']}
                                        onClick={() =>
                                            history.push(
                                                Paths.ajoonamu.support +
                                                    '/qna/write',
                                            )
                                        }
                                    >
                                        상담문의
                                    </ButtonBase>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles['configure']}>
                    <div className={styles['contain']}>
                        <Configure
                            src={basicBanner}
                            level={{
                                name: 'BASIC',
                                value: '3,000',
                                color: '#FDD800',
                            }}
                            content={{
                                title: '가성비 최고! 간편 식단',
                                one: '메인메뉴 1개로 구성된 간편식단입니다.',
                                two:
                                    '매일 다르게 또는 요일별로 메뉴를 지정할 수 있습니다.',
                                three:
                                    '메인메뉴 : 샌드위치, 유부초밥, 주먹밥, 샐러드',
                                four:
                                    '구성에 따라 가격변동이 있을 수 있습니다.',
                            }}
                        />
                        <Configure
                            src={plusBanner}
                            level={{
                                name: 'PLUS',
                                value: '4,000',
                                color: '#008762',
                            }}
                            content={{
                                title: '샌달 BEST! 기본 식단',
                                one:
                                    '메인메뉴와 서브메뉴로 구성된 기본식단입니다.',
                                two:
                                    '구성에 따라 가격변동이 있을 수 있습니다. (구성변경가능)',
                                three:
                                    '메인메뉴 : 샌드위치, 유부초밥, 주먹밥, 샐러드 ',
                                four: '서브메뉴 : 컵과일, 음료, 계란 등',
                            }}
                        />
                        <Configure
                            src={premiumBanner}
                            level={{
                                name: 'PREMIUM',
                                value: '5,000',
                                color: '#EA5A2A',
                            }}
                            content={{
                                title: '최고의 구성! 프리미엄 식단',
                                one:
                                    '팀 또는 기업단위로 다양한 메뉴를 즐길 수 있는 프리미엄 식단입니다.',
                                two:
                                    '메인메뉴 2~3가지와 서브메뉴로 구성되어 있습니다.',
                                three: '월 단위로 구성되는 패키지 입니다.',
                                four:
                                    '구성에 따라 가격변동이 있을 수 있습니다.',
                            }}
                        />
                    </div>
                    <div className={styles['divider']} />
                    <div className={styles['contain']}>
                        <h2 className={styles['menu-title']}>샌달 식단표</h2>
                        <p className={styles['sub-title']}>Sample Menu</p>
                        <div data-aos="fade-up">
                            <img
                                className={styles['menu-image']}
                                src={SampleMenu}
                                alt="식단표"
                            />
                        </div>
                        <div className={styles['sub-area']}>
                            <p>
                                모든 메뉴와 구성은 고객의 입맛에 따라 원하시는
                                메뉴로 재구성이 가능합니다.
                            </p>
                            <p>재료 수급에 따라 식단표와 상이할 수 있습니다.</p>
                        </div>
                        <div className={styles['button-area']}>
                            <ButtonBase
                                className={styles['button']}
                                onClick={() =>
                                    history.push(
                                        Paths.ajoonamu.support + '/qna/write',
                                    )
                                }
                            >
                                상담문의
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BreakfastMenuContainer;
