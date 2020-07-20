import React from 'react';
import './Find.css';
const ShowUserId =()=>{
    return(
        <div className="app-profile">
        <div className="app-profile-content">
            <div className="app-profile-success">
                <span className="app-profile-logo">
                    LOGO
            </span>
            <span className="app-profile-logo">
                    아이디 찾기
            </span>
            </div>

            <div className="app-profile item-box">
                <div className="app-profile user">
                  안녕하세요 이창훈님<br></br>
                  찾으시는 아이디는 test입니다.
                </div>
            </div>
            <div className="app-profile link">
                <div className="app-profile link-box">
                  비밀번호 찾기
                </div>
                <div className="app-profile link-box">
                    로그인
                </div>
            </div>

        </div>
    </div>
    )
}


export default ShowUserId;