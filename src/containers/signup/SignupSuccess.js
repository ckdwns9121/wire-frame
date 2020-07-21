import React, { useState, useEffect } from 'react';
import './SignupSuccess.css';


const SignupSuccess = () => {
    return (
        <div className="app-profile">
            <div className="app-profile-content">
                <div className="app-profile">
                    <span className="app-profile-logo">
                        LOGO
                </span>
                    <div className="app-profile-title">
                        회원가입 완료
                </div>
                </div>
                {/* 로고 */}

                <div className="app-profile item-box" >
                    <span className="app-profile-title">
                        축하합니다 이창훈님
                </span>
                    <div className="app-profile sub-title">
                        아주나무 딜리버리에 회원가입이 완료되었습니다.
                </div>
                </div>
                <div className="app-profile login">
                    <button className="app-profile-nomal-btn">로그인 하기</button><br />
                </div>

            </div>
        </div>

    )
}

function CompleteBox() {
    return (
        <div className="app-profile item-box" >

        </div>
    )
}

function MainTitle({mainTitle}) {
    return (
        <div className="app-profile-title">
            {mainTitle}
        </div>
    )
}
function SubTitle({subtitle}) {
    return (
        <div className="app-profile sub-title">
            {subtitle}
        </div>
    )
}
export default SignupSuccess;
