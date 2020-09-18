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


const initMenu2 = [
    {
        item_id: 1,
        title: "과일도시락",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: Menu1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:Menu2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img : Menu3,
        price: "5000원"
    },    
    {
        id: 4,
        title: "과일도시락4",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: Menu4,
        price: "5000원"
    },    {
        id: 5,
        title: "과일도시락5",
        img: Menu1,
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        price: "5000원"
    },    {
        id: 6,
        title: "과일도시락6",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:Menu2,
        price: "5000원"
    },
]

const initMenu3= [
    {
        item_id: 1,
        title: "과일도시락",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: Menu1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:Menu2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img : Menu3,
        price: "5000원"
    },    
    {
        id: 4,
        title: "과일도시락4",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img: Menu4,
        price: "5000원"
    },    {
        id: 5,
        title: "과일도시락5",
        img: Menu1,
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        price: "5000원"
    },    
    {
        id: 6,
        title: "과일도시락6",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:Menu2,
        price: "5000원"
    },

    {
        id: 7,
        title: "과일도시락6",
        text: "아주나무의 여러가지 과일로 구성된 알찬 도시락 입니다",
        img:Menu2,
        price: "5000원"
    },
]

export const getCustomMenuList = async () => {
    await sleep(1000); // 0.5초 쉬고
    return initMenu; // list 배열
};


export const getOtherUserMenu =async()=>{
    await sleep(1000); // 0.5초 쉬고
    return initMenu2; // list 배열
}

export const getMenuList =async()=>{
    await sleep(1000); // 0.5초 쉬고
    return initMenu3; // list 배열
}