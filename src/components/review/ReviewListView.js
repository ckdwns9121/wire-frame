import React from 'react';
import styles from './Review.module.scss';
import Slider from 'react-slick';
import { IconButton } from '@material-ui/core';
import ReviewItem from './ReviewItem';

import Prev from '../svg/menu/prev.svg';
import Next from '../svg/menu/next.svg';

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
            right: '-32px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            zIndex: 1000,
        }}
        onClick={onClick}
    >
        <img
            style={{ display: 'block', width: '32px', height: '32px' }}
            src={Next}
            alt="next"
        />
    </IconButton>
);

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
            left: '-32px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            zIndex: 1000,
        }}
        onClick={onClick}
    >
        <img
            style={{ display: 'block', width: '32px', height: '32px' }}
            src={Prev}
            alt="prev"
        />
    </IconButton>
);

// 슬릭추가
export default ({ reviewList, onClick }) => {
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>
                {reviewList.map(
                    ({
                        email,
                        review_id,
                        review_body,
                        review_images,
                        review_rating,
                    }) => (
                        <ReviewItem
                            key={review_id}
                            email={email}
                            body={review_body}
                            images={review_images}
                            rating={review_rating}
                            onClick={() => onClick(review_id)}
                        />
                    ),
                )}
            </Slider>
        </div>
    );
};
