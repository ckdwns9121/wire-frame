import axios from 'axios';
import { Paths } from '../../paths';
import {Menu1,Menu2,Menu3,Menu4,Menu5,Menu6} from '../../components/svg/prefer';
import { Menu } from '@material-ui/core';

const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const initMenu = [
    {
        id: 1,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img:Menu1,
                count: '100',
                price: '5000',
            },
            {
                id: 2,
                title: '과일도시락',
                img:Menu2,
                count: '100',
                price: '5000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img:Menu3,
                price: '5000',
            },
            {
                id: 4,
                title: '과일도시락',
                img:Menu4,
                count: '2',
                price: '5000',
            },
        ],
    },
    {
        id: 2,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img:Menu1,
                count: '100',
                price: '5000',
            },
            {
                id: 2,
                title: '과일도시락',
                img:Menu2,
                count: '100',
                price: '5000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img:Menu3,
                price: '5000',
            },
 
        ],
    },

    {
        id: 3,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img:Menu6,
                count: '100',
                price: '5000',
            },
            {
                id: 2,
                title: '과일도시락',
                img:Menu1,
                count: '100',
                price: '5000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img:Menu2,
                price: '5000',
            },
            {
                id: 4,
                title: '과일도시락',
                img:Menu3,
                count: '2',
                price: '5000',
            },
            {
                id: 5,
                title: '과일도시락',
                img:Menu4,
                count: '2',
                price: '5000',
            },
        ],
    },

    {
        id: 4,
        list: [
            {
                id: 1,
                title: '과일도시락',
                img:Menu1,
                count: '100',
                price: '5000',
            },
            {
                id: 2,
                title: '과일도시락',
                img:Menu2,
                count: '100',
                price: '5000',
            },
            {
                id: 3,
                title: '과일도시락',
                count: '2',
                img:Menu3,
                price: '5000',
            },
            {
                id: 4,
                title: '과일도시락',
                img:Menu4,
                count: '2',
                price: '5000',
            },
        ],
    },
];

export const getCustomMenuList = async () => {
    console.log('들어옴');
    await sleep(1000); // 0.5초 쉬고
    return initMenu; // list 배열
};