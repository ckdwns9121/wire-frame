import React from 'react';
import DetailContainer from '../../containers/shop/DetailContainer';
import qs from 'qs';

function DetailMenu({location}){
    const query = qs.parse(location.search,{
        ignoreQueryPrefix: true
    });
    console.log(query);
    return(
        <>
        <DetailContainer item_id ={query.item_id}/>
        </>

    )
}
export default DetailMenu;