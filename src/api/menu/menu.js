import { Menu1, Menu2, Menu3, Menu4, Menu6 } from '../../components/svg/prefer';

import axios from 'axios';
import { Paths } from '../../paths';

const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const initMenu = [
    {
        id: 1,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img: Menu1,
                count: '100',
                price: '5,000',
            },
            {
                id: 2,
                title: '과일도시락',
                img: Menu2,
                count: '100',
                price: '5,000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img: Menu3,
                price: '5,000',
            },
            {
                id: 4,
                title: '과일도시락',
                img: Menu4,
                count: '2',
                price: '5,000',
            },
        ],
    },
    {
        id: 2,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img: Menu1,
                count: '100',
                price: '5,000',
            },
            {
                id: 2,
                title: '과일도시락',
                img: Menu2,
                count: '100',
                price: '5,000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img: Menu3,
                price: '5,000',
            },
        ],
    },

    {
        id: 3,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img: Menu6,
                count: '100',
                price: '5,000',
            },
            {
                id: 2,
                title: '과일도시락',
                img: Menu1,
                count: '100',
                price: '5,000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img: Menu2,
                price: '5,000',
            },
            {
                id: 4,
                title: '과일도시락',
                img: Menu3,
                count: '2',
                price: '5,000',
            },
            {
                id: 5,
                title: '과일도시락',
                img: Menu4,
                count: '2',
                price: '5,000',
            },
        ],
    },

    {
        id: 4,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img: Menu1,
                count: '100',
                price: '5,000',
            },
            {
                id: 2,
                title: '과일도시락',
                img: Menu2,
                count: '100',
                price: '5,000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img: Menu3,
                price: '5,000',
            },
            {
                id: 4,
                title: '과일도시락',
                img: Menu4,
                count: '2',
                price: '5,000',
            },
        ],
    },
];


export const getCustomMenuList = async () => {
    await sleep(1000); // 0.5초 쉬고
    return initMenu; // list 배열
};

export const getOtherUserMenu = async () => {

    const req = Paths.api + 'user/item/view_prefer?limit';
    axios.defaults.baseURL = req;
    const res = await axios.get();
    return res;
    ; // list 배열
};

export const getPreferMenuList = async () => {
    const req =
        Paths.api +
        `user/item/prefer?item_type=1&general_offset&general_limit&prefer_offset&prefer_limit&budget=15000&desire_quan=1000&addr1=부산`;

    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const result = await axios.get(req, config);
    console.log(result);
    return result.data.query;
}


export const getMenuList = async (id) => {
    const req = Paths.api + `user/item/list?offset&limit&ca_id=${id}`;
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const result = await axios.get(req, config);
    return result.data.query.items;
};

export const getMainMenuList = async (token) => {
    const req = Paths.api + 'user/item/main?offset&limit&';
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query.items;
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

export const getSearchMenu = async (search, limit, offset) => {
    const req = Paths.api + 'user/item/search';
    const config = {
        headers: {
            'content-type': 'application/json',
        },
        params: {
            offset, limit, search
        }
    };
    const res = axios.get(req, config);
    return res;
}