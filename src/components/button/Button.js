import React from 'react';
import './Button.scss';


const Button =({title, onClick})=>{
    return(
        <button className="sign-btn" onClick ={onClick}>{title}</button>
    )
}

export default Button; 