import React, { useEffect } from 'react';

import styles from './BreakfastContainer.module.scss';
import backgroundBanner from '../../components/svg/breakfast/banner.png';
import bottomBanner from '../../components/svg/breakfast/bottomBanner.png';
import { ButtonBase } from '@material-ui/core';

import AOS from 'aos';
import 'aos/dist/aos.css';

const BreakfastContainer = () => {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    return (
        <div>
            <div className={styles['banner']} style={{ backgroundImage: 'url(' + backgroundBanner + ')'}}>
                <div className={styles['content']} data-aos='fade-up'>
                    <p className={styles['title']}>기업조식 정기배송 서비스</p>
                    <p className={styles['text']}>샌달과 하루를 효율적으로 시작해보세요.</p>
                    <div className={styles['button-area']}>
                        <ButtonBase className={styles['button']}>
                            상담문의
                        </ButtonBase>
                    </div>
                </div>
            </div>
            <div className={styles['area']}>
                <div className={styles['container']}>


                    <div className={styles['bottom-banner']} style={{ backgroundImage: 'url(' + bottomBanner + ')'}}>
                        <div className={styles['content']} data-aos='fade-up'>
                            <p className={styles['title']}>기업조식 정기배송 서비스</p>
                            <p className={styles['text']}>하루의 시작은 샌달이 책임져드립니다</p>
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
    );
};
export default BreakfastContainer;