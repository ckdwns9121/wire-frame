import axios from 'axios';
import { Paths } from '../../paths';

export const getOtherUserMenu = async () => {
    const req = Paths.api + 'user/item/view_prefer?limit';
    axios.defaults.baseURL = req;
    const res = await axios.get();
    return res;
};

export const getPreferMenuList = async () => {
    const req = Paths.api + `user/item/prefer?item_type=1&general_offset&general_limit&prefer_offset&prefer_limit&budget=15000&desire_quan=1000&addr1=부산`;
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const result = await axios.get(req, config);
    console.log(result);
    return result.data.query;
};

export const getMainMenuList = async (ca_id, offset = 0, limit = 8, shop_id) => {
    const req = Paths.api + 'user/item/main';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            ca_id,
            limit,
            offset,
            shop_id
        },
    };
    const result = await axios.get(req, config);
    return result.data.query.items;
};

export const getMenuList = async (ca_id,offset=0, limit=8,shop_id) => {
    const req = Paths.api + 'user/item/list';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            ca_id,
            limit,
            offset,
            shop_id
        }
    }
    const result = await axios.get(req, config);
    // console.log(result);
    return result;
};

export const getMenuInfo = async (item_id) => {
    const req = Paths.api + `user/item/view?offset&limit&item_id=${item_id}`;
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
};

export const getSearchMenu = async (search, offset, limit) => {
    const req = Paths.api + 'user/item/search';
    const config = {
        headers: {
            'content-type': 'application/json',
        },
        params: {
            offset,
            limit,
            search,
        },
    };
    const res = axios.get(req, config);
    return res;
};
