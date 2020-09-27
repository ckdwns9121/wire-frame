import React, { useCallback, useEffect, useState } from 'react';
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
import styles from './HomeContainer.module.scss';
import HomeSlick from './HomeSlick';
import MenuListView from '../../../components/item/MenuListView';
import {
    bannerImg,
    backImg,
    orderServiceImg,
    templateImg,
} from '../../../components/svg/home';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import KakaoMap from '../../../components/map/KakaoMap';
import { getMainMenuList } from '../../../api/menu/menu';
import Loading from 'components/assets/Loading';
const cx = cn.bind(styles);
const HomeContainer = () => {
    const history = useHistory();
    const [category, setCategory] = useState(0);

    const [loading, setLoading] = useState(false);
    const [menuList, setMenuList] = useState([]);

    const getMainMenu = async () => {
        setLoading(true);
        try {
            const res = await getMainMenuList();
            setMenuList(res);
        } catch (e) {
            alert('error!');
        }
        setLoading(false);
    }

    const onClickDetailItem = useCallback((item_id)=>{
        history.push(`${Paths.ajoonamu.product}?item_id=${item_id}`);
    },[history]);

    useEffect(() => {
        getMainMenu();
    }, [category]);

    return (
        <>
            <div className={styles['carousel']}>
                <HomeSlick />
            </div>
            <div className={styles['container']}>
                <Banner
                    title={'메뉴 추천 받아보기'}
                    subtitle={'샌달에서 간편하게 추천해드려요'}
                />
                <div className={styles['menu-list']}>
                    <ul className={styles['category']}>
                        <li onClick={() => setCategory(0)} className={cx('item', { active: category === 0})}>도시락</li>
                        <li onClick={() => setCategory(1)} className={cx('item', { active: category === 1})}>베이커리</li>
                        <li onClick={() => setCategory(2)} className={cx('item', { active: category === 2})}>기타</li>
                        <li onClick={() => setCategory(3)} className={cx('item', { active: category === 3})}>베이커리</li>
                        <li onClick={() => setCategory(4)} className={cx('item', { active: category === 4})}>기타</li>
                    </ul>
                    <Loading open={loading}/>
                    { menuList !== [] && <MenuListView menuList={menuList} onClick={onClickDetailItem}/>}
                </div>
                <div className={styles['banner-img']} onClick ={()=>{   history.push(`${Paths.ajoonamu.shop}?tab=${0}`) ; window.scrollTo(0,0)}}>
                    <img src={bannerImg} alt="배너" />
                </div>
                <div className={styles['order']}>
                    <div
                        className={styles['box']}
                        style={{ backgroundImage: 'url(' + backImg + ')' }}
                    />
                    <div className={cx('box')}>
                        <div className={styles['service']}>
                            <div className={styles['pd-box']} data-aos='fade-up'>
                                <div className={styles['title']}>
                                    기업조식 정기배송 서비스
                                </div>
                                <div className={styles['sub-title']}>
                                    샌달과 하루를 효율적으로 시작해보세요
                                </div>
                                <ButtonBase
                                    onClick={()=>{ history.push(`${Paths.ajoonamu.breakfast}`); window.scrollTo(0,0)}}
                                    className={styles['order-btn']}
                                >
                                    자세히보기
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </div>
                <Banner title={'샌달의 서비스'} subtitle={'샌달은 고객님께 신선함까지 함께 배달해드려요'} />
                <div className={styles['service-box']}>
                    <div className={styles['service-type']}>
                        <div className={styles['box']} data-aos='fade-up'>
                            <img
                                className={styles['box-img']}
                                alt="template"
                                src={templateImg}
                            />
                            <div className={styles['box-text']}>
                                <div className={styles['title']}>
                                    익일 배달서비스 가능
                                </div>
                                <div className={styles['sub-title']}>
                                    익일 배달서비스를 활용해보세요.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['service-type']}>
                        <div className={styles['box']} data-aos='fade-up'>
                            <img
                                className={styles['box-img']}
                                src={orderServiceImg}
                                alt="order"
                            />
                            <div className={styles['box-text']}>
                                <div className={styles['title']}>
                                    도시락 무료 문구서비스 제공
                                </div>
                                <div className={styles['sub-title']}>
                                    원하는 템플릿을 골라 정성과 마음을 전하세요.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <KakaoMap />
            </div>
        </>
    );
};

function Banner({ title, subtitle, text }) {
    return (
        <div className={styles['banner']}>
            <div className={styles['title']}>{title}</div>
            <div className={styles['sub-title']}>{subtitle}</div>
            <div className={styles['text']}>{text}</div>
        </div>
    );
}

export default HomeContainer;
