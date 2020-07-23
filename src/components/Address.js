import React, { useState,usee, useEffect } from "react";
import AddrItem from 'components/Address/AddrItem';
import AddrItemList from 'components/Address/AddrItemList';
// import key from "./key";

const key = "devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE";
const Address = () => {
  const [text, setText] = useState("");
  const [addrs,setAddrs] =useState('');
  const [resultAddrs , setReseltAddr] = useState('');
  
  const setInputText = e => {
    setText(e.target.value);
    console.log(addrs);
  };

  const findAddress =async () => {
    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${text}&confmKey=${key}=&resultType=json`
    )
      .then(res => res.json())
      .then(json => console.log(json.results))
      .catch(err => console.log(err));
  };

  const onClickSearch =async ()=>{
    const result = await callApi();
    console.log("결과");
    setAddrs(result);

  }


  const callApi = () => {
    return fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${text}&confmKey=${key}=&resultType=json`)
      .then(res => res.json())
      .then(json => json.results.juso)
      .catch(err => console.log(err));
  }
  useEffect(()=>{
    
  },[addrs])


  return (
    <>
      <h1>배달지 검색</h1>
      <input placeholder="예) 아주나무동12-3 또는 아주나무 아파트" value={text} onChange={setInputText} />
      <button onClick={onClickSearch}>주소 찾기</button>
      {addrs ? `검색결과 ${addrs.length} 개` : "검색결과 0 개"}
      {addrs ? <AddrItemList addrs={addrs}/> :""} 
    </>
  );
};

export default Address;