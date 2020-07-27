import React from 'react';
import { useHistory } from 'react-router-dom';
import './TitleBar.scss';
import {IoIosArrowRoundBack} from 'react-icons/io';
import logo from 'logo.svg';

// 메인 로고 이미지

const TitleBar = ({ title, src, alt }) => {
    return (
        <div className="app-sign-titlebar">
            <div>
                <Logo src={src} alt={title} />
            </div>
            <div className="app-sign-item">
                <BackButton />
                <Title title={title} />
                <div className="app-sign-empty" />
            </div>
        </div>

    )
}

function Title({ title }) {
    return (
        <div className="app-sign-title">
            <span>{title}</span>
        </div>
    )
}
function Logo({ src, alt }) {
    return (
        <img className="app-sign-logo" src={logo} alt={alt}></img>
    )
}
function BackButton(onClick) {
    const history = useHistory();
    const goToBack = () => {
        history.goBack();
    }
    return (
        <div className="app-sign-back" onClick={goToBack}>
            <IoIosArrowRoundBack size="50"/>
        </div>
    )
}

export default TitleBar;