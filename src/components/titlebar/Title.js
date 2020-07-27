import React from 'react';
import './Title.scss';


// 헤더 밑 서브 헤더 컴포넌트
const Title = ({ mainTitle,subTitle,addr }) => {

    /* 
    사용자가 마지막으로 선택한 배달지를 
    addr로 받아와 렌더.
    useSelect로 전역 state로 받아와도 됨
    */
   
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