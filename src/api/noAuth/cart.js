import axios from 'axios';
import { Paths } from '../../paths';

export const noAuthAddCart = async (
    item_id,
    item_options,
    item_quanity,
) => {
    const req = Paths.api + 'noauth/cart';
    const form_data = {
        item_id: item_id,
        item_option_id: item_options,
        item_quanity: item_quanity,
    };
    axios.defaults.headers.post['Context-Type'] = 'application/json';

    const res = await axios.post(req, form_data);
    return res;
};

export const noAuthGetCartList = async(cart_id, addr1) =>{

    const req = Paths.api + `noauth/cart/list?card_ids=${cart_id}&addr1=${addr1}`;
    axios.defaults.baseURL = req;
    const res = await axios.get();
    console.log(res);
    return res;

}