import React, { useState, useEffect, useCallback, useReducer} from 'react';
import {Paths} from 'paths';
import {useHistory} from 'react-router-dom';
import styles from './Sign.module.scss';
import SignNormalInput from 'components/sign/SignNormalInput';
import TitleBar from 'components/titlebar/TitleBar';
import Button from 'components/button/Button';

const logo = "http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";

const initialUserState = {
    email: '',
    password: '',
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'UPDATE_USER_PASSWORD':
            return {
                ...state,
                password: action.password
            }
        default:
            return state;

    }
}

const SignInContainer = () => {
    const history = useHistory();
    const [user,dispatchUser] = useReducer(userReducer,initialUserState);

    const updateEmail = useCallback((e) => {
        console.log(e.target.value);
        dispatchUser({type:'UPDATE_USER_EMAIL', email:e.target.value});
        console.log(user);
    })
    const updatePassword = useCallback((e) => {
        console.log(e.target.value);
        dispatchUser({type:'UPDATE_USER_PASSWORD', password:e.target.value});
        console.log(user);
    })
    const goToSignup =useCallback(()=>{
        history.push(Paths.ajoonamu.signup);
    })
    const onLogin=useCallback(()=>{
        history.push(Paths.index);
    })
    const goToRecovery=useCallback(()=>{
        history.push(Paths.ajoonamu.recovery);
    })

    return (
        <div className="sign-main">
            <div className="sign-content">
                <TitleBar title="로그인" src={logo} alt="로그인"></TitleBar>
                <label>이메일</label>
                <SignNormalInput inputType={"text"} initValue={user.email} onChange={updateEmail}/>
                <label>비밀번호</label>
                <SignNormalInput inputType={"password"} initValue={user.password} onChange={updatePassword}/>

                <div className={styles.sub}>
                    <div>
                        <input type="radio" name="remember" />
                        <label className={styles.grayText}>이메일 기억하기</label><br />
                    </div>
                    <div onClick={goToRecovery}>
                        <label className={styles.grayText}>아이디/비밀번호 찾기</label>
                    </div>
                </div>
                <Button title={"로그인"} onClick ={onLogin}></Button>
                <Button title={"회원가입"} onClick={goToSignup}></Button>

                {/* 이부분 컴포넌트 만들어야함 */}
                <div className={styles.social}>
                    <div style={{ marginBottom: 50 }}>간편로그인</div>
                    <div className={styles.sns}>
                        <span> 네이버 로그인</span>
                    </div>
                    <div className={styles.sns}>
                        <span> 카카오 로그인</span>
                    </div>
                    <div className={styles.sns}>
                        <span> 페이스북 로그인</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignInContainer;