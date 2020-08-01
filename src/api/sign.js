import axios from 'axios';

const url = "http://devapi.ajoonamu.com/api/";

export const userSignin = async (email,password)=>{

    const reqUrl =url + "user/login";

    const formdata ={
        email:email,
        password:password
    }

    const result = await axios.post(reqUrl,formdata);
    console.log(result);
}

export const userSignup = async (email,password,password_confirm)=>{

    const url ="http://devapi.ajoonamu.com/api/user/register";
    console.log(email);
    const formdata ={

        email:email,
        password:password,
        password_confirm: password_confirm,
        agree_marketing:0,

    }

    const result = await axios.post(url,formdata);
    console.log(result);
}
