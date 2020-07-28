import React from 'react';

const DetailContainer =({match})=>{
    return(
        <div>
           {match.params.data}
        </div>
    )
}

export default DetailContainer;