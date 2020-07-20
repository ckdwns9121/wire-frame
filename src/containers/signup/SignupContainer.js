import React, { useState, useEffect } from 'react';
import './SignupContainer.css';

var input;
// 카운트 다운 
var num = 60 * 3; // 몇분을 설정할지의 대한 변수 선언
var myVar;

function alertFunc() {
    var min = num / 60; 
    min = Math.floor(min);
     
    var sec = num - (60 * min);
    console.log(min)
    console.log(sec)

    input = `${min} : ${sec}`;

    if(num == 0){
        clearInterval(myVar) // num 이 0초가 되었을대 clearInterval로 타이머 종료
    }
    num--;
}



const SignupContainer = () => {


    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [time ,setTime] =useState('');
    const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const onTimer =()=>{
        myVar = setInterval(alertFunc, 1000); 
    }

    const alertFunc=()=>{
        var min = num / 60; 
        min = Math.floor(min);
         
        var sec = num - (60 * min);
        console.log(min)
        console.log(sec)
    
        input = `${min} : ${sec}`;
        setTime(input);
    
        if(num == 0){
            clearInterval(myVar) // num 이 0초가 되었을대 clearInterval로 타이머 종료
        }
        num--;
    }
    useEffect(() => {

    },[time])
    useEffect(() => {
       onTimer();
    },[])
    return (
        <div className="app-profile">
            <div className="app-profile-content">
                <span> 타이머</span> <span id ="timer">{input}</span>
            <span className="app-profile-logo">
                        LOGO
                </span>
                <div className="app-profile-title">
                    회원가입
                </div>
                <form className="app-profile-form">
                    <div className="app-profile-input">
                        <label>이메일</label><br />
                        <input className="auth" value={userEmail} placeholder="E-mail" id="email" onChange={onChangeEmail} />
                        <button className="app-profile-auth-btn">중복검사</button>
                    </div>
                    <div className="app-profile-input">
                        <label>비밀번호</label><br />
                        <input className="nomal" value={userPassword} id="password" type="password" onChange={onChangePassword} /><br />
                        <label>비밀번호 확인</label><br />
                        <input className="nomal" value={userPassword} id="password" type="password" onChange={onChangePassword} /><br />
                        <label>비밀번호가 일치합니다.</label><br />
                    </div>

                    <div className="app-profile-input">
                        <label>휴대폰 번호인증</label><br />
                        <input className="auth" value={userPassword} id="phone" type="text" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증번호발송</button>
                        <input className="auth" value={userPassword} id="password" type="password" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증하기</button>
                    </div>

                    <div className="app-profile-agree">
                    <div className="app-profile-agree item">
                            <div className="app-profile-agree-label all">
                                <input type="radio"  />
                                <label>모두 동의합니다</label>
                            </div>
                        </div>
                        <div className="app-profile-agree item">
                            <div className="app-profile-agree-label">
                                <input type="radio" />
                                <label>개인정보처리방침 필수 동의</label>
                            </div>
                            <div className="app-profile-agree-link">
                                <label>보기 ></label>
                            </div>
                        </div>
                        <div className="app-profile-agree item">
                            <div className="app-profile-agree-label">
                                <input type="radio" />
                                <label>이용약관 필수 동의</label>
                            </div>
                            <div className="app-profile-agree-link">
                                <label>보기 ></label>
                            </div>
                        </div>
                        <div className="app-profile-agree item">
                            <div className="app-profile-agree-label">
                                <input type="radio" />
                                <label>이벤트알림 선택 동의</label>
                            </div>
                            <div className="app-profile-agree-link">
                                <label>보기 ></label>
                            </div>
                        </div>
                        <div className="app-profile-agree-item sub">
                            <div className="app-profile-agree sub">
                                <label>SMS, 이메일을 통해 할인/이벤트/쿠폰 정보를 </label><br></br>
                                <label>받아보실 수 있습니다. </label>
                            </div>
                        </div>
                    </div>
                    <button className="app-profile-nomal-btn">가입하기</button><br />
                </form>
            </div>
        </div>

    )
}

export default SignupContainer;
