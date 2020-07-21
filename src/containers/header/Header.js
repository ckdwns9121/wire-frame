import React from 'react';
import './header.css';

const logo ="http://www.agenciasampling.com.br/asampling/assets/img/sample/shortcode/logo/1.png";
const Header =()=>{
    return(
        <div className="app-header">
            <div className ="app-header-nav">
                <div className="app-header-logo">
                    <img className ="app-header-logoimg" src={logo}></img>
                </div>
                <div className="app-header-menu">
                    <ui>
                        <li>브랜드홈</li>
                        <li>예약주문</li>
                        <li>택배배송</li>
                        <li>이벤트</li>
                        <li>고객센터</li>
                    </ui>
                </div>
                <div className="app-header-user">
                    <ui>
                        <li>로그인</li>
                    </ui>
                </div>
            </div>
        </div>
    )
}

export default Header;