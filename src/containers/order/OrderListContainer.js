import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import Message from 'components/assets/Message';
import Loading from '../../components/assets/Loading';
import { getOrderList } from '../../api/order/orderItem';
import { useStore } from '../../hooks/useStore';
import PreviewOrderList from '../../components/order/PreviewOrderItemList';
import Pagination from '../../components/pagenation/Pagenation';
import DateRangePicker from '../../components/mypage/DateRangePicker';
import { calculateDate } from '../../lib/calculateDate';
import qs from 'qs';

//주문내역 페이지
const OrderListContainer = () => {
    const user_token = useStore(true);
    const history = useHistory();
    const location = useLocation();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    
    let page = query.page ? parseInt(query.page) : 1;

    const [startDate, setStartDate] = useState(
        calculateDate(new Date(), 7, 'DATE'),
    );
    const [endDate, setEndDate] = useState(new Date());
    const [order_list, setOrderList] = useState([]); //전체 데이터.
    const [loading, setLoading] = useState(false); //로딩
    const [currentPage, setCurrentPage] = useState(page); //현재 페이지
    const [postsPerPage] = useState(2); //한페이지에서 보여줄 POST의 수

    const indexOfLastPost = currentPage * postsPerPage; // 현재 포스트에서 마지막 인덱스
    const indexOfFirstPost = indexOfLastPost - postsPerPage; //현재 포스트에서 첫번째 인덱스
    const currentPosts = order_list.slice(indexOfFirstPost, indexOfLastPost); //현재 포스트에서 보여줄 리스트

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        history.push({
            pathname: `${Paths.ajoonamu.mypage}/order_list`,
            search: `?page=${pageNumber}`,
            // state: { isOTP: isOTP },
        });
        window.scrollTo(0, 0);
    }; //페이지를 이동시킬 함수.

    const callOrderListApi = useCallback(async () => {
        setLoading(true);
        if (user_token) {
            const res = await getOrderList(
                user_token,
                0,
                10,
                startDate,
                endDate,
            );
            console.log(res);
            setOrderList(res.orders ? res.orders : []);
        }
        setLoading(false);
    }, [user_token, startDate, endDate]);

    const onClickOrderItem = useCallback(
        (order_id) => {
            history.push(
                `${Paths.ajoonamu.mypage}/order_detail?order_id=${order_id}`,
            );
        },
        [history],
    );

    useEffect(() => {
        callOrderListApi();
    }, []);

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>주문내역</div>
            </div>
            <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onClick={callOrderListApi}
            />
            {loading ? (
                <Loading open={loading} />
            ) : (
                <>
                    <div className={styles['order-list']}>
                        {currentPosts.legnth !== 0 ? (
                            <>
                                <PreviewOrderList
                                    order_list={currentPosts}
                                    onClick={onClickOrderItem}
                                />
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={order_list.length}
                                    paginate={paginate}
                                    index={currentPage}
                                />
                            </>
                        ) : (
                            <Message
                                msg={'주문 내역이 존재하지 않습니다.'}
                                isButton={true}
                                buttonName={'주문하러 가기'}
                                onClick={() =>
                                    history.push(`${Paths.ajoonamu.shop}?tab=0`)
                                }
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default OrderListContainer;
