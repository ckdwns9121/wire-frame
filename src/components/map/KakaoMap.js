/*global kakao*/
import React, { useEffect } from 'react';
import Map from './Map';
import styles from './Map.module.scss';
import { searchIcon } from '../svg/header';


import AOS from 'aos';
import 'aos/dist/aos.css';

function KakaoMap() {

    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    return (
        <div className={styles['kakao-map']}>
            <Map />
            <div className={styles['map-area']}>
                <div className={styles['modal']} data-aos='fade-up'>
                    <h3 className={styles['title']}>지점찾기</h3>
                    <div className={styles['search-input']}>
                        <div className={styles['input']}>
                            <input className={styles['search']} />
                            <img
                                className={styles['icon']}
                                src={searchIcon}
                                alt="검색"
                            />
                        </div>
                    </div>
                    <p className={styles['count']}>총 <b>12개</b>의 지점을 찾았습니다.</p>
                    <div className={styles['item']}>
                        <p className={styles['name']}>서울시청역점</p>
                        <p className={styles['location']}>서울 특별시 중구 세종대로</p>
                        <p className={styles['tel']}>02-000-0000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default KakaoMap;
