import React from 'react';
import styles from './SignComplete.module.scss';
import TitleBar from '../titlebar/TitleBar';
import Button from '../button/Button';



const SignComplete =({mainTitle,subTitle,text})=>{
    return(
            <CompleteBox mainTitle={mainTitle} subTitle={subTitle} text={text}/>
    )
}

function CompleteBox({mainTitle,subTitle,text}) {
    return (
        <div className={styles.itemBox} >
            <MainTitle mainTitle={mainTitle}></MainTitle>
            <SubTitle subTitle={subTitle}></SubTitle>
            <Text text={text}></Text>
        </div>
    )
}

function MainTitle({mainTitle}) {
    return (
        <div className={styles.mainTitle}>
            {mainTitle}
        </div>
    )
}
function SubTitle({subTitle}) {
    return (
        <div className={styles.subTitle}>
            {subTitle}
        </div>
    )
}
function Text ({text}){
    return(
        <div className={styles.text}>
            {text}
        </div>
    )
}

export default SignComplete;
