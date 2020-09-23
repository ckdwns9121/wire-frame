import React,{useCallback} from 'react';
import styles from './Mypage.module.scss';
import { Paths } from '../../paths';
import Sidebar from '../../components/sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';

import CouponConatainer from '../coupon/CouponContainer';
import AccountContainer from '../account/AccountContainer';
import OrderListContainer from '../order/OrderListContainer'


const LinkList = [
    { name: "주문내역", url: `${Paths.ajoonamu.mypage}/order_list` },
    { name: "쿠폰함", url: `${Paths.ajoonamu.mypage}/coupon` },
    { name: "내정보", url: `${Paths.ajoonamu.mypage}/account` },
];
const MypageContainer = ({ pathname }) => {
    console.log(pathname);

    const getTitle = useCallback((path) => {
        if (path.indexOf('/order_list') !== -1) {
            return "주문내역";
        } else if (path.indexOf('/coupon') !== -1) {
            return "쿠폰함";
        } else {
            return "내정보";
        }
    }, [])

    return (
        <div className={styles['container']}>
            <Sidebar title={"나의정보"} linkList={LinkList} active={'/mypage' + pathname} />
            <div className={styles['content']}>
                <h2 className={styles['title']}>{getTitle(pathname)}</h2>
                <Switch>
                    <Route path={`${Paths.ajoonamu.mypage}/order_list/:id?`} component={OrderListContainer} />
                    <Route path={`${Paths.ajoonamu.mypage}/coupon/:id?`} component={CouponConatainer} />
                    <Route path={`${Paths.ajoonamu.mypage}/account`} component={AccountContainer} />
                </Switch>
            </div>
        </div>
    );
};

export default MypageContainer;