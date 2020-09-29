import React, { useCallback, useEffect, useState } from 'react';
import styles from './HomeSlick.module.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { requestBannerList } from '../../../api/event/banner';
import { useModal } from '../../../hooks/useModal';
import { DBImageFormat } from '../../../lib/formatter';




const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const HomeSlick = () => {
    const openModal = useModal();
    const [list, setList] = useState([]);
    const getBannerList = useCallback(async () => {
        try {
            const res = await requestBannerList();
            if (res.data.msg === '성공') {
                setList(res.data.query);
            } else {
                openModal('배너를 가지고 오는데 오류가 발생했습니다.', '페이지를 새로고침 해 주세요.');
            }
        } catch (e) {
            openModal('배너를 가지고 오는데 오류가 발생했습니다.', '페이지를 새로고침 해 주세요.');
        }
    }, [openModal]);
    
    useEffect(() => {
        getBannerList();
    }, [getBannerList]);

    return (
        <div className={styles['container']}>
            <Slider {...settings}>
                {list.map(item => (
                    <Link key={item.id} to={item.bn_url}>
                        <div className={styles['item']} style={{ backgroundImage: "url('"+DBImageFormat(item.bn_img) + "')" }}/>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlick;
