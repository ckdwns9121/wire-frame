import React from 'react';
import MypageContainer from '../../containers/mypage/MypageContainer';


const Mypage =({match,location})=>{
    console.log("들어옴");
    console.log(match.params);
    return(
        <MypageContainer/>
    )
}
export default Mypage;