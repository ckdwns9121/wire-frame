import axios from 'axios';
import { Paths } from '../../paths';



export const getStroeList =async (search)=>{
    console.log("들어옴");
    const req = Paths.api + `user/shop/list?search=${search}`;
    axios.defaults.baseURL = req;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    const res = await axios.get();

    console.log(res);
    return res;
}