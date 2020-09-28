import axios from 'axios';
import {Paths} from '../../paths';

export const noAuth_order = async (
    cart_ids,
    s_hp,
    post_num,
    addr1,
    addr2='',
    lat,
    lng,
    order_type='reserve',
    order_memo,
    delivery_memo,
    delivery_req_time
     // cp_id,
    // point_price,
    
) => {
    const req = Paths.api + 'noauth/order';

    const form_data = {
        cart_ids,
        s_hp,
        post_num,
        addr1,
        addr2,
        lat,
        lng,
        order_type,
        order_memo,
        delivery_memo,
        delivery_req_time,
    };
    console.log(form_data);
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    const res = await axios.post(req, form_data);
    return res;
};
