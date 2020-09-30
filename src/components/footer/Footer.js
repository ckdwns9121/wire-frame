import React from 'react';
import styles from './Footer.module.scss';
import { Fb_Icon, Insta_Icon, Blog_Icon } from '../svg/footer';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../paths';
import { IconButton } from '@material-ui/core';

const Footer = () => (
    <div className={styles['footer']}>
        <div className={styles['content']}>
            <div className={styles['title']}>
                <div className={styles['tos']}>
                    <div className={styles['text1']}>
                        <NavLink activeStyle={{ color: '#222', fontWeight: 'bold' }} to={Paths.ajoonamu.policy}>개인정보처리방침</NavLink>
                        <NavLink activeStyle={{ color: '#222', fontWeight: 'bold' }} to={Paths.ajoonamu.term_use}>이용약관</NavLink>
                    </div>
                </div>
                <div className={styles['sns']}>
                    <Icon src={Fb_Icon} alt={'fb'} href="https://www.facebook.com/ajoonamu/" />
                    <Icon src={Insta_Icon} alt={'insta'} href="https://www.instagram.com/ajoonamu_ajoonamu/" />
                    <Icon src={Blog_Icon} alt={'blog'} href="https://blog.naver.com/ajoonamu/" />
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

const Icon = ({ src, alt, href }) => (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className={styles['asset']} href={href} target="_blank">
        <IconButton>
            <img src={src} alt={alt} />
        </IconButton>
    </a>
);

export default Footer;
