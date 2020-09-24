import React, { useEffect } from 'react';
import classnames from 'classnames/bind'

import styles from './BreakfastContainer.module.scss';
import backgroundBanner from '../../components/svg/breakfast/banner.png';
import bottomBanner from '../../components/svg/breakfast/bottomBanner.png';

import welfare1 from '../../components/svg/breakfast/welfare_1.png';
import welfare2 from '../../components/svg/breakfast/welfare_2.png';
import welfare3 from '../../components/svg/breakfast/welfare_3.png';

import menu1 from '../../components/svg/breakfast/menu1.svg';
import menu2 from '../../components/svg/breakfast/menu2.svg';
import menu3 from '../../components/svg/breakfast/menu3.svg';
import menu4 from '../../components/svg/breakfast/menu4.svg';
import menu5 from '../../components/svg/breakfast/menu5.svg';
import menu6 from '../../components/svg/breakfast/menu6.svg';
import menuArrow from '../../components/svg/breakfast/arrow.svg';


import { ButtonBase } from '@material-ui/core';

import AOS from 'aos';
import 'aos/dist/aos.css';


const cn = classnames.bind(styles);

const BreakfastContainer = () => {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    return (
        <div>
            <div className={styles['banner']} style={{ backgroundImage: 'url(' + backgroundBanner + ')'}}>
                <div className={styles['content']} data-aos='fade-up'>
                    <p className={styles['title']}>든든한 하루의 시작</p>
                    <p className={styles['text']}>샌달 기업조식 서비스.</p>
                    <div className={styles['button-area']}>
                        <ButtonBase className={cn('button', 'green')}>
                            메뉴보기
                        </ButtonBase>
                        <ButtonBase className={cn('button', 'white', 'grid')}>
                            문의하기
                        </ButtonBase>
                    </div>
                </div>
            </div>
            <div className={styles['area']}>
                <div className={cn('container', 'welfare')}>
                    <h3 className={styles['title']}>매일 아침 도착하는 조식 복지</h3>
                    <div className={styles['content']}>
                        <div className={styles['item']} data-aos='fade-up' data-aos-delay="200">
                            <div className={styles['box']}>
                                <img className={styles['image']} src={welfare1} alt="조식" />
                                <div className={styles['text']}>
                                    <h5 className={styles['intro']}>매일 신선하게</h5>
                                    <div className={styles['sub']}>
                                        <p>샌달은 매일 새벽 직접 생산한</p>
                                        <p>샌드위치를 신속하게 배송합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['item']} data-aos='fade-up' data-aos-delay="600">
                            <div className={styles['box']}>
                                <img className={styles['image']} src={welfare2} alt="조식" />
                                <div className={styles['text']}>
                                    <h5 className={styles['intro']}>매달 새롭게</h5>
                                    <div className={styles['sub']}>
                                        <p>메뉴 선호도 조사와 다양한 메뉴 개발을</p>
                                        <p>통해 새로운 식단을 제공합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['item']} data-aos='fade-up' data-aos-delay="400">
                            <div className={styles['box']}>
                                <img className={styles['image']} src={welfare3} alt="조식" />
                                <div className={styles['text']}>
                                    <h5 className={styles['intro']}>항상 건강하게</h5>
                                    <div className={styles['sub']}>
                                        <p>신뢰할 수 있는 재료로 건강과 위생을</p>
                                        <p>생각하며 안전하게 만듭니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['divider']} />
            <div className={styles['area']}>
                <div className={cn('container', 'diet')}>
                    <h3 className={styles['title']}>간단하게 준비하는 맞춤식단</h3>
                    <div className={styles['content']}>
                        <ul className={styles['list']}>
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="200">
                                <img src={menu1} alt="맞춤식단" />
                                <p className={styles['text']}>맞춤상담</p>
                            </li>
                            <img className={styles['arrow']} src={menuArrow} alt="다음" />
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="400">
                                <img src={menu2} alt="맞춤식단" />
                                <p className={styles['text']}>메뉴구성</p>
                            </li>
                            <img className={styles['arrow']} src={menuArrow} alt="다음" />
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="600">
                                <img src={menu3} alt="맞춤식단" />
                                <p className={styles['text']}>식단확인</p>
                            </li>
                            <img className={styles['arrow']} src={menuArrow} alt="다음" />
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="800">
                                <img src={menu4} alt="맞춤식단" />
                                <p className={styles['text']}>새벽배송</p>
                            </li>
                            <img className={styles['arrow']} src={menuArrow} alt="다음" />
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="1000">
                                <img src={menu5} alt="맞춤식단" />
                                <p className={styles['text']}>조식섭취</p>
                            </li>
                            <img className={styles['arrow']} src={menuArrow} alt="다음" />
                            <li className={styles['item']} data-aos='fade-up' data-aos-delay="1200">
                                <img src={menu6} alt="맞춤식단" />
                                <p className={styles['text']}>피드백/개선</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles['divider']} />
            <div className={styles['area']}>
                <div className={styles['container']}>
                    
                </div>
            </div>
            <div className={styles['area']} style={{ backgroundColor: '#FEDE22'}}>
                <div className={styles['container']}>
                    
                </div>
            </div>
            <div className={styles['area']}>
                <div className={styles['container']}>
                    
                </div>
            </div>

            {/* <div className={styles['area']}>
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
            </div> */}
        </div>
    );
};
export default BreakfastContainer;