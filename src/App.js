import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_user_info } from './store/auth/auth';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import { Paths } from 'paths';
import {
    Signin,
    SignUp,
    Logout,
    SignupComplete,
    Recovery,
    RecoveryId,
    RecoveryPw,
    FindEmail,
    FindPassword,
    Mypage,
    Support,
    Breakfast,
    Event,
    Agree,
} from 'pages';
import { Home, Address, Reserve, DetailMenu } from 'pages';
import { Cart, Order, OrderComplete } from 'pages';
import { Route, Switch } from 'react-router-dom';
import { get_address } from './store/address/address';
import { get_near_store } from './store/address/store';
import { getActiveAddr } from './api/address/address';
import { getNearStore } from './api/store/store';
import { get_menulist } from './store/product/product';
import { get_breakMenuList } from './store/product/braekfast';
import { noAuthGetNearStore } from './api/noAuth/store';
import ModalContainer from './containers/assets/ModalContainer';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Search } from './pages';
import { useUrl } from './hooks/useStore';

export default function App() {
    useUrl();

    const dispatch = useDispatch();
    const getInfo = async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            dispatch(get_user_info(token));
            const res = await getActiveAddr(token);
            console.log(res);
            if(res){
                dispatch(get_address(res))
                const {lat,lng,addr1} = res;
                const near_store = await getNearStore(lat, lng, addr1);
                dispatch(get_near_store(near_store.data.query));
                dispatch(get_menulist(null));
                dispatch(get_breakMenuList(null));
            }
            else{
                console.log('배달정보 없음');
                dispatch(get_address({addr1:null, addr2:null,lat:null,lng:null,post_num:null}));
                dispatch(get_near_store(null));
                dispatch(get_menulist(null));
                dispatch(get_breakMenuList(null));
            }
        } else {
            const noAuth = JSON.parse(localStorage.getItem('noAuthAddrs'));
            if (noAuth) {
                const index = noAuth.findIndex((item) => item.active === 1);
                if (index !== -1) {
                    const {addr1, addr2,lat,lng,post_num} = noAuth[index];
                    dispatch(get_address({addr1,addr2,lat,lng,post_num}));
                    const near_store = await noAuthGetNearStore(lat,lng,addr1);
                    console.log('비회원 가장 가까운 곳');
                    console.log(near_store);
                    dispatch(get_near_store(near_store.data.query));
                    dispatch(get_menulist(null));
                    dispatch(get_breakMenuList(null));
                }
                else{
                    console.log("비회원 배달정보 없음");
                    dispatch(get_address({addr1:null,addr2:null,lat:null,lng:null,post_num:null}));
                    dispatch(get_near_store(null));
                    dispatch(get_menulist(null));
                    dispatch(get_breakMenuList(null));


                }
            }
        }
    };

    useEffect(() => {
        getInfo();
        AOS.init({ duration: 1500, once: true });
    }, []);

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact={true} path={Paths.index} component={Home}></Route>
                <Route path={Paths.ajoonamu.signin} component={Signin}></Route>
                <Route path={Paths.ajoonamu.signup} component={SignUp}></Route>
                <Route
                    path={`${Paths.ajoonamu.complete}/:name?`}
                    component={SignupComplete}
                ></Route>
                <Route
                    path={Paths.ajoonamu.recovery}
                    component={Recovery}
                ></Route>
                <Route
                    path={Paths.ajoonamu.recovery_id}
                    component={RecoveryId}
                ></Route>
                <Route
                    path={Paths.ajoonamu.recovery_pw}
                    component={RecoveryPw}
                ></Route>
                <Route
                    path={Paths.ajoonamu.find_email}
                    component={FindEmail}
                ></Route>
                <Route
                    path={Paths.ajoonamu.find_password}
                    component={FindPassword}
                ></Route>
                <Route
                    path={Paths.ajoonamu.address}
                    component={Address}
                ></Route>
                <Route
                    path={Paths.ajoonamu.product}
                    component={DetailMenu}
                ></Route>
                <Route path={Paths.ajoonamu.shop} component={Reserve}></Route>
                <Route
                    exact
                    path={Paths.ajoonamu.cart}
                    component={Cart}
                ></Route>
                <Route
                    path={Paths.ajoonamu.order_complete}
                    component={OrderComplete}
                ></Route>
                <Route path={Paths.ajoonamu.order} component={Order}></Route>
                <Route path={Paths.ajoonamu.logout} component={Logout} />
                <Route
                    exact
                    path={`${Paths.ajoonamu.breakfast}/:name?`}
                    component={Breakfast}
                ></Route>
                <Route
                    path={Paths.ajoonamu.support}
                    component={Support}
                ></Route>
                <Route
                    path={`${Paths.ajoonamu.event}/:id?`}
                    component={Event}
                ></Route>
                <Route path={Paths.ajoonamu.order} component={Order}></Route>
                <Route path={Paths.ajoonamu.agree} component={Agree}></Route>
                <Route
                    path={`${Paths.ajoonamu.mypage}/:tab?`}
                    component={Mypage}
                ></Route>
                <Route
                    path={`${Paths.ajoonamu.search}`}
                    component={Search}
                ></Route>
            </Switch>
            <Footer />
            <ModalContainer />
        </div>
    );
}

