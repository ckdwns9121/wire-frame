import React from 'react';
import './Title.scss';
const Title = ({ mainTitle,subTitle,addr }) => {
    return (
        <div className="app-title">
            <div className="app-title-main">
                <div className="app-title-content">
                    <div className="app-title-maintitle">
                        {mainTitle}
                </div>
                    <div className="app-title-location">
                     {addr ? addr :"배달지를 설정해주세요"} 
                </div>
                </div>
            </div>
            <div className="app-title-sub">
                <div className="subtitle">
                  {subTitle}
                </div>
            </div>
        </div>
    )
}

export default Title