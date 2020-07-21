import React from 'react';
import './Title.scss';
const Title = ({ mainTitle,subTitle,location }) => {
    return (
        <div className="app-title">
            <div className="app-title-main">
                <div className="app-title-content">
                    <div className="app-title-maintitle">
                        {mainTitle}
                </div>
                    <div className="app-title-location">
                     {location}
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