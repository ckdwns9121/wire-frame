import axios from 'axios';
import { Paths } from '../../paths';

export const user_order = async (
    token,
    order_type,
    order_memo,
    delivery_memo,
    delivery_req_time
     // cp_id,
    // point_price,
    
) => {
    const req = Paths.api + 'user/order';

    const form_data = {
        order_type: 'reserve',
        order_memo: order_memo,
        delivery_memo: delivery_memo,
        delivery_req_time:delivery_req_time,
    };
    console.log(form_data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post(req, form_data);
    return res;
};



export const order_cancle =async( token, order_id)=>{
    console.log(order_id);
    console.log("취소시작");
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
// delivery_req_time:'2020-12-31'
//"2020-09-26 18:22:19"