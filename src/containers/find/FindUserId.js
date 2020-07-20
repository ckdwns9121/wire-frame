import React, { useState, useEffect } from 'react';



const FindUserId = () => {
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
            <div className="app-profile-content">
            <span className="app-profile-logo">
                        LOGO
                </span>
                <div className="app-profile-title">
                    아이디 찾기
                </div>
                <form className="app-profile-form">
                    <div className="app-profile-input">
                        <label>이름</label><br />
                        <input className="nomal" value={userEmail} placeholder="E-mail" id="email" onChange={onChangeEmail} />
                    </div>

                    <div className="app-profile-input">
                        <label>휴대폰 번호인증</label><br />
                        <input className="auth" value={userPassword} id="phone" type="text" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증번호발송</button>
                        <input className="auth" value={userPassword} id="password" type="password" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증하기</button>
                    </div>
                    <div className="app-profile-input">
                        <label>휴대폰 번호인증</label><br />
                        <input className="auth" value={userPassword} id="phone" type="text" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증번호재발송</button>
                        <input className="auth" value={userPassword} id="password" type="password" onChange={onChangePassword} />
                        <button className="app-profile-auth-btn">인증하기</button>
                    </div>
                    <button className="app-profile-nomal-btn">확인</button><br />
                </form>
            </div>
        </div>

    )
}

export default FindUserId;
