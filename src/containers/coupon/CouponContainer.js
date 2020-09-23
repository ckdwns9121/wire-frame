import React, { useState, useEffect, useCallback } from 'react';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import SubTabMenu from '../../components/tab/SubTabMenu';
import CouponItemList from 'components/coupon/CouponItemList';
import UseCouponItemList from 'components/coupon/UseCouponItemList';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import DownCouponItemList from '../../components/coupon/DownCouponList';

const tabInit = [
    {
        id: 0,
        url: `${Paths.ajoonamu.mypage}/coupon?tab=0`,
        name: '내 쿠폰',
    },
    {
        id: 1,
        url: `${Paths.ajoonamu.mypage}/coupon?tab=1`,
        name: '쿠폰받기',
    },
    {
        id: 2,
        url: `${Paths.ajoonamu.mypage}/coupon?tab=2`,
        name: '쿠폰사용내역',
    },
];

const CouponConatiner = (props) => {
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    });

    const [index, setIndex] = useState(0);

    const onChangeIndex = (idx) => {
        setIndex(idx);
    };

    useEffect(() => {
        console.log(query.tab);
        if (query.tab !== undefined) {
            setIndex(parseInt(query.tab));
        }
    }, [query]);

    const getTitle = useCallback(() => {
        if (index === 0) {
            return '내 쿠폰';
        } else if (index === 1) {
            return '쿠폰받기';
        } else if (index === 2) {
            return '쿠폰사용내역';
        }
    }, [index]);
    return (
        <div className={styles['container']}>
            <SubTabMenu tabs={tabInit} onChange={onChangeIndex} index={index} />
            <div className={styles['content']}>
                {index === 0 && (
                    <div className={styles['input-coupon']}>
                        <div className={styles['text']}>쿠폰 코드 입력</div>
                        <input
                            className={styles['code']}
                            placeholder="등록할 쿠폰번호를 입력해 주세요."
                        ></input>
                        <div className={styles['btn']}>쿠폰등록</div>
                    </div>
                )}

                <div className={styles['tab-title']}>{getTitle()}</div>

                {index === 2 && (
                    <div className={styles['use-coupon']}>
                        <div className={styles['date']}>
                            <div className={styles['date-box']}>1주일</div>
                            <div className={styles['date-box']}>1개월</div>
                            <div className={styles['date-box']}>3개월</div>
                            <div className={styles['date-box']}>6개월</div>
                        </div>
                        <div className={styles['date-input-box']}>
                            <div className={styles['text']}>기간 입력</div>
                            <div className={styles['input']}>
                                <input></input>
                            </div>
                            <div className={styles['line']}></div>

                            <div className={styles['input']}>
                                <input></input>
                            </div>
                            <div className={styles['btn']}>조회</div>
                        </div>
                    </div>
                )}

                <div className={styles['coupon-list']}>
                    {index === 0 && <CouponItemList />}
                    {index === 1 && <DownCouponItemList />}
                    {index === 2 && <UseCouponItemList />}
                </div>
            </div>
        </div>
    );
};

export default withRouter(CouponConatiner);
