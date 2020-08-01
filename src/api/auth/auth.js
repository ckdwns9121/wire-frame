import axios from 'axios';

const DEFAULT_URL ="http://devapi.ajoonamu.com/api/";
export const localLogin = async (email,password) => { 
    const REQ_URL =DEFAULT_URL + "user/login";

    const formdata ={
        email:email,
        password:password
    }

    const result = await axios.post(REQ_URL,formdata);
    console.log(result);
    return result.data;
}

export const localRegister = async (email,password,password_confirm)=>{

    const REQ_URL =DEFAULT_URL+ "user/register";
    const formdata ={

        email:email,
        password:password,
        password_confirm: password_confirm,
        agree_marketing:0,

    }

    const result = await axios.post(REQ_URL,formdata);
    console.log(result);
}
