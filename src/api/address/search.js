import axios from 'axios';

const URL = "http://www.juso.go.kr/addrlink/addrLinkApi.do";
const KEY= 'devU01TX0FVVEgyMDIwMDgyMzIxNTAzMDExMDA4OTU=';

export const addr_test= async () =>{
    const query = `${URL}?confmKey=${KEY}&currentPage=1&countPerPage=10&keyword=${"동아대학교"}&resultType=json`;
    const res = await axios.get(query);
    return res.data.results.juso;
}