import React from 'react';
import styles from './Review.module.scss';
import { DBImageFormat, hideEmail } from '../../lib/formatter';
import Star from '../svg/home/Star';
import IMG from '../svg/review/review.png';

//홈 메뉴 이미지 컴포넌트
const ReviewImage = ({ src }) => (
    <div className={styles['review-img']}>
        <img className={styles['img']} src={IMG} alt="메뉴 이미지" />
    </div>
);

const ReviewRating = ({ rating }) => {
    const rate = parseInt(rating);
    return (
        <p className={styles['rating']}>
            {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} clip={star > rate} />
            ))}
            <span className={styles['rate']}>({rating})</span>
        </p>
    );
};

export default ({ email, body, rating, images, onClick }) => (
    <div className={styles['review-item']} onClick={onClick}>
        <ReviewImage src={DBImageFormat(images)} />
        <div className={styles['pd-box']}>
            <div className={styles['text']}>
                <p className={styles['body']}>{body}</p>
                <div className={styles['info']}>
                    <p className={styles['user']}><span>{hideEmail(email)}</span>님</p>
                    <ReviewRating rating={rating} />
                </div>
            </div>
        </div>
    </div>
);
