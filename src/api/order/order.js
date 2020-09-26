import axios from 'axios';
import { Paths } from '../../paths';

export const user_order = async (
    token,
//     order_type,
//     cp_id,
//     order_memo,
//     delivery_memo,
) => {
    const req = Paths.api + 'user/order';

    const form_data = {
        order_type: 'reserve',
        order_memo: '빨리좀',
        delivery_memo: '주세요',
        delivery_req_time:'2020-12-31'
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};



export const order_cancle =async( token, order_id)=>{
    console.log(order_id);
    const req = Paths.api + 'user/order/cancel';

    const form_data = {
        order_id:order_id,
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.put(req, form_data);
    console.log(res);
    return res;

}