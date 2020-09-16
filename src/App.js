import React ,{useEffect,useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {get_user_info} from './store/auth/auth';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import './App.css';
import {Paths} from 'paths';
import {Signin,SignUp,SignupComplete,Recovery,RecoveryId,RecoveryPw,FindEmail,FindPassword} from 'pages';
import {Home,Account,Address,Reserve,DetailMenu} from 'pages';
import {Cart,Order,OrderList,Coupon} from 'pages';
import {Error} from 'pages';
import {Route,Switch} from 'react-router-dom';

function App() {

  const dispatch = useDispatch();

  const getInfo= useCallback(async()=>{
    const token = sessionStorage.getItem("access_token");
    console.log(token);
    if(token!=null || token!=undefined){
    dispatch(get_user_info(token));
    }
  });

  useEffect(()=>{
  getInfo();
  },[getInfo])



  return (
    <>
    <div className="App">
      <Header/>
      <Switch>
      <Route exact={true}path={Paths.index} component={Home}></Route>
      <Route path={Paths.ajoonamu.signin} component={Signin}></Route>
      <Route path={Paths.ajoonamu.signup} component={SignUp}></Route>
      <Route path={Paths.ajoonamu.complete} component={SignupComplete}></Route>
      <Route path={Paths.ajoonamu.recovery} component={Recovery}></Route>
      <Route path={Paths.ajoonamu.recovery_id}  component={RecoveryId}></Route>
      <Route path={Paths.ajoonamu.recovery_pw} component={RecoveryPw}></Route>
      <Route path={Paths.ajoonamu.find_email} component={FindEmail}></Route>
      <Route path={Paths.ajoonamu.find_password} component={FindPassword}></Route>
      <Route path={Paths.ajoonamu.account}component={Account}></Route>
      <Route path={Paths.ajoonamu.address} component={Address} ></Route>
      <Switch>
      <Route path={`${Paths.ajoonamu.shop}/:tab/:value/:data`} exact component={DetailMenu}></Route>
      <Route path={`${Paths.ajoonamu.shop}/:tab`} component={Reserve}></Route>
      </Switch>
      <Route exact path={Paths.ajoonamu.cart} component={Cart}></Route>
      <Route path={Paths.ajoonamu.order} component={Order}></Route>
      <Route path={`${Paths.ajoonamu.order_list}/:tab?`} component={OrderList}></Route>
      <Route path ={`${Paths.ajoonamu.coupon}/:tab`} component={Coupon}></Route>
      </Switch>
      <Footer/>
    </div>
    </>
  );
}

export default App;
