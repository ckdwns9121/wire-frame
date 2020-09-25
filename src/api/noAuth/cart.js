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
