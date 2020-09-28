import axios from 'axios';
import { Paths } from '../../paths';

export const getStoreList = async (search, limit, offset) => {
    const req = Paths.api + 'user/shop/list';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            search,
            limit,
            offset
        }
    }

    const res = await axios.get(req, config);
    return res;
};
