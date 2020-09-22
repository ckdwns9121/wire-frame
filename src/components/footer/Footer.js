import React from 'react';
import styles from './Footer.module.scss';
import { Fb_Icon, Insta_Icon, Blog_Icon } from '../svg/footer';

const Footer = () => {
    return (
        <div className={styles['footer']}>
            <div className={styles['content']}>
                <div className={styles['title']}>
                    <div className={styles['tos']}>
                        <div className={styles['text1']}>
                            <span>개인정보 처리방침</span>
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
                            <div className={styles['text']}>
                                입점문의 무료상담
                            </div>
                            <div className={styles['number']}>1234-5678</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Icon({ src, alt }) {
    return (
        <div className={styles['asset']}>
            <img src={src} alt={alt} />
        </div>
    );
}

export default Footer;
