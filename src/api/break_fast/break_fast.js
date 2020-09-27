import axios from 'axios';
import {Paths} from '../../paths';



export const getBreakCategory = async()=>{
    const req = Paths.api +`user/item/breakfast_cate`;
    axios.defaults.baseURL = req;
    const res = await axios.get();
    console.log(res);
    return res;
}

export const getBreakMenu =async(ca_id)=>{
    const req= Paths.api + `user/item/breakfast?offset=0&limit=20&ca_id=${ca_id}`;
    axios.defaults.baseURL=req;
    const res= await axios.get();
    console.log(res);
    return res;

}