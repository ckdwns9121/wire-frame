import React from 'react';
import styles from './Review.module.scss';
import PROFILE_IMG from '../svg/sign/profile.png';
import MENU from '../svg/menu/menu1.png';
import Slider from 'react-slick';
import { IconButton } from '@material-ui/core';
import Prev from '../svg/review/prev.svg';
import Next from '../svg/review/next.svg';
import CloseIcon from '../svg/modal/CloseIcon';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

const ReviewModal = (props) => {
    return (
        <>
        <div className={cx('dialog', {open: props.open})} >
                <ReviewImgList/>
            <div className={styles['content']}>
                 <div className={styles['close']}>
                    <CloseIcon onClick={props.handleClose} black={true}/>
                </div>
                <div className={styles['user-info']}>
                <UserProfile src ={PROFILE_IMG}/>
                <UserEmail mail={"gdgd"} />
                </div>
                <div className ={styles['review-info']}>
                    <div className={styles['review-box']}>
                        <div className={styles['review']}>
                        모임 준비할 시 간이 없어서 샌달에서 구매했는데 받아보고 완
                    전 만족했습니다~~! 다음에 또 구매하려구요!    
                        </div>
               
                    </div>
                </div>
            </div>
            </div>
            <div className={cx('dim',{dimopen : props.open})} onClick={props.handleClose} />
         </>

    );
};

function UserProfile({src}) {
    return (
        <div className={styles['user-profile']}>
            <img src={src} alt="profile" />
        </div>
    );
}

function UserEmail({mail}) {
    return (
        <div className={styles['user-email']}>
            <span className={styles['email']}>{mail}</span>
            <span>님</span>
        </div>
    );
}

function MenuImg ({src}) {
    return(
        <img  className={styles['img']} src={src} alt='메뉴'/>
    )
}


const SamplePrevArrow = ({ style, onClick }) => (
    <IconButton
        style={{
            ...style,
            cursor: 'pointer',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '64px',
            height: '64px',
            top: '40%',
            left: '0px',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            zIndex: 1000,
        }}
        onClick={onClick}
    >
        <img style={{ display: 'block' }} src={Prev} alt="prev" />

    </IconButton>
);



const SampleNextArrow = ({ style, onClick }) => (
    <IconButton
        style={{
            ...style,
            cursor: 'pointer',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '64px',
            height: '64px',
            top: '40%',
            right: '0px',
            borderRadius: '50%',
            zIndex: 1000,
        }}
        onClick={onClick}
    >
        <img style={{ display: 'block' }} src={Next} alt="next" />
    </IconButton>
);


const ReviewImgList = ({menuList,onClick}) => {

    const settings = {
        infinite: true,
        autoplay: false,
        dots: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles['slick-img']}>
            <Slider {...settings}>
            <MenuImg src={MENU}/>
            <MenuImg src={MENU}/>
            <MenuImg src={MENU}/>
            <MenuImg src={MENU}/>
            <MenuImg src={MENU}/>
            </Slider>
        </div>
    );
};

export default ReviewModal;
