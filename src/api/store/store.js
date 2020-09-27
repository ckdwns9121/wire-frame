import axios from 'axios';
import { Paths } from '../../paths';

export const getStroeList = async (search) => {
    const req = Paths.api + `user/shop/list?search=${search}`;
    axios.defaults.baseURL = req;
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const res = await axios.get();
    return res;
};
