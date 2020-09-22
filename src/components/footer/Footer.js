import React from 'react';
import styles from './Footer.module.scss';
import { Fb_Icon, Insta_Icon, Blog_Icon } from '../svg/footer';

const Footer = () => (
    <div className={styles['footer']}>
        <div className={styles['content']}>
            <div className={styles['title']}>
                <div className={styles['tos']}>
                    <div className={styles['text1']}>
                        <span>개인정보처리방침</span>
                        <span>이용약관</span>
                    </div>
                </div>
                <div className={styles['sns']}>
                    <Icon src={Fb_Icon} alt={'fb'} />
                    <Icon src={Insta_Icon} alt={'insta'} />
                    <Icon src={Blog_Icon} alt={'blog'} />
                </div>
            </div>
            <div className={styles['context']}>
                <div className={styles['contact-table']}>
                    <div className={styles['cell']}>
                        <div className={styles['text']}>입점문의 무료상담</div>
                        <div className={styles['number']}>1234-5678</div>
                    </div>
                    <div className={styles['cell']}>
                        <p className={styles['support']}>
                            <span className={styles['have-divider']}>
                                고객센터 전화번호 : 1234-5678
                            </span>
                            <span>
                                고객센터 운영시간 : 평일 am 9:00 ~ pm 5:00
                            </span>
                        </p>
                        <p className={styles['info']}>
                            <span className={styles['have-divider']}>
                                업체명 : 샌달
                            </span>
                            <span className={styles['have-divider']}>
                                대표자명 :
                            </span>
                            <span className={styles['have-divider']}>
                                사업자등록번호: 123-456-7890{' '}
                            </span>
                            <span>통신판매업신고번호: 123-456-7890</span>
                        </p>
                        <p className={styles['address']}>
                            주소:서울특별시 중구 세종대로 110
                        </p>
                        <p className={styles['copyright']}>
                            Copyright © Sandal Corp. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Icon = ({ src, alt }) => (
    <div className={styles['asset']}>
        <img src={src} alt={alt} />
    </div>
);

export default Footer;
