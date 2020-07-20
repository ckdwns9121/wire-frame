import React, { useState, useEffect } from 'react';
import './LoginContainer.css';



const LoginContainer = () => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');

    const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    useEffect(() => {
        console.log(userEmail);
    })
    return (
        <div className="app-profile">
            <div className ="app-profile-content">        
                <form className="app-profile-form">
                <span className="app-profile-logo">
                    LOGIN
                </span>
                <label>이메일</label><br />
                <div className="app-profile-input">
                <input className="nomal" value={userEmail} placeholder="E-mail" id="email" onChange={onChangeEmail} />
                </div>
                <label>비밀번호</label><br />   
                <div className="app-profile-input">
                <input className="nomal" value={userPassword} placeholder="E-mail" id="password" type="password" onChange={onChangePassword} /><br />
                </div>
                <div className= "app-profile-sub">
                <div className="app-profile-remember">
                <input type="radio" name="remember"/>
                <label className="app-profile-sub-label">이메일 기억하기</label><br />
                </div>
                <div className="app-profile-forgot">
                <label className="app-profile-sub-label">아이디/비밀번호 찾기</label>
                </div>
                </div>
                <button className="app-profile-nomal-btn">로그인</button><br />
                <button className="app-profile-nomal-btn">회원가입</button><br />
            </form>
            <div className ="app-profile-social">
              <div style={{marginBottom:50}}>간편로그인</div>
              <div className="app-profile-social-sns">
                <span> 네이버 로그인</span>
            </div>
            <div className="app-profile-social-sns">
                <span> 카카오 로그인</span>
            </div>
            <div className="app-profile-social-sns">
                <span> 페이스북 로그인</span>
            </div>
            </div>
            </div>
        </div>

    )
}

export default LoginContainer;
