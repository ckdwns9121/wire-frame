import axios from 'axios';
import {Paths} from '../../paths';

export const getMyCoupons = async (token) =>{
    const req = Paths.api +'user/coupon/list_my';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
}

export const getOrderCoupons = async(token) =>{
    const req = Paths.api +'user/coupon/list_order';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
}
export const getDownloadCpList = async(token) =>{
    const req = Paths.api +'user/coupon/list_zone';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
}

export const downloadCoupon = async (token, cz_id) =>{
    const req = Paths.api + 'user/coupon';

    const form_data = {
        cz_id: cz_id,

    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};