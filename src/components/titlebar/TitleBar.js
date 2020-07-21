import React from 'react';
import './TitleBar.scss';



const TitleBar =({title,src,alt})=>{
    return(
        <div className="app-sign-titlebar">
         <Logo src={src} alt={title}/>
          <Title title={title}/>
        </div>

    )   
}

function Title({title}){
    return(
        <div className="app-sign-title">
            <span>{title}</span>
        </div>
    )
}
function Logo({src,alt}){
    return(
        <img className="app-sign-logo" src={src} alt={alt}></img>
    )
}
function BackButton (){
    return(
        <div>

        </div>
    )
}

export default TitleBar;