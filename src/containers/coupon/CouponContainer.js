import React, { useState, useEffect, useCallback } from 'react';
import { Paths } from 'paths';
import styles from './Coupon.module.scss';
import SubTabMenu from '../../components/tab/SubTabMenu';
import CouponItemList from '../../components/coupon/CouponItemList';
import UseCouponItemList from '../../components/coupon/UseCouponItemList';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import DownCouponItemList from '../../components/coupon/DownCouponList';
import { useStore } from '../../hooks/useStore';
import { getMyCoupons, getDownloadCp } from '../../api/coupon/coupon';
import Loading from '../../components/assets/Loading';
import Message from '../../components/message/Message';

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
        name: '쿠폰 사용 내역',
    },
];

const CouponConatiner = (props) => {
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [index, setIndex] = useState(0);
    const [cp_list, setCpList] = useState([]);
    const [down_cp_list, setDownCpList] = useState([]);
    const user_token = useStore();

    const onChangeIndex = (idx) => {
        setIndex(idx);
    };

    const getTitle = useCallback(() => {
        if (index === 0) {
            return '내 쿠폰';
        } else if (index === 1) {
            return '쿠폰받기';
        } else if (index === 2) {
            return '쿠폰사용내역';
        }
    }, [index]);

    //현재 보유한 쿠폰 리스트
    const getMyCouponList = async () => {
        setLoading(true);
        if (user_token) {
            const res = await getMyCoupons(user_token);
            console.log(res);
            setCpList(res);
            setSuccess(true);
        } else setError(true);
        setLoading(false);
    };

    // 다운로드 가능한 쿠폰 리스트
    const getDownCouponList = async () => {
        setLoading(true);

        if (user_token) {
            const res = await getDownloadCp(user_token);
            console.log(res);
            setDownCpList(res);
            setSuccess(true);
        } else setError(true);
        setLoading(false);
    };

    useEffect(() => {
        getMyCouponList();
        getDownCouponList();
    }, []);

    useEffect(() => {
        if (query.tab !== undefined) {
            setIndex(parseInt(query.tab));
        }
    }, [query]);

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
                    {index === 0 && (
                        <>
                            {cp_list.length !== 0 ? (
                                <CouponItemList cp_list={cp_list} />
                            ) : (
                                <Message
                                    msg={'보유하고 있는 쿠폰이 없습니다.'}
                                />
                            )}
                        </>
                    )}
                    {index === 1 && (
                        <>
                            {down_cp_list.length !== 0 ? (
                                <DownCouponItemList cp_list={down_cp_list} />
                            ) : (
                                <Message
                                    msg={'발급 받을 수 있는 쿠폰이 없습니다.'}
                                />
                            )}
                        </>
                    )}
                    {index === 2 && <UseCouponItemList />}
                </div>
            </div>
        </div>
    );
};

export default withRouter(CouponConatiner);
