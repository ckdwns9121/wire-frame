import React from 'react';
import styles from './MenuList.module.scss';
import Slider from 'react-slick';
import MainMenuItem from './MainMenuItem';
import menu1 from '../svg/menu/menu1.png';
import menu2 from '../svg/menu/menu2.png';
import menu3 from '../svg/menu/menu3.png';
import menu4 from '../svg/menu/menu4.png';

import Prev from '../svg/menu/prev.svg';
import Next from '../svg/menu/next.svg';
import { IconButton } from '@material-ui/core';

const initMenu = [
    {
        item_id: 1,
        title: '과일도시락1',
        img: menu1,
        price: '5,000원 부터',
    },
    {
        item_id: 2,
        title: '과일도시락2',
        img: menu2,
        price: '5,000원 부터',
    },
    {
        item_id: 3,
        title: '과일도시락3',
        img: menu3,
        price: '5,000원 부터',
    },
    {
        item_id: 4,
        title: '과일도시락4',
        img: menu4,
        price: '5,000원 부터',
    },
    {
        item_id: 5,
        title: '과일도시락5',
        img: menu1,
        price: '5,000원 부터',
    },
    {
        item_id: 6,
        title: '과일도시락6',
        img: menu2,
        price: '5,000원 부터',
    },
    {
        item_id: 7,
        title: '과일도시락7',
        img: menu3,
        price: '5,000원 부터',
    },
    {
        item_id: 8,
        title: '과일도시락8',
        img: menu4,
        price: '5,000원 부터',
    },
    {
        item_id: 9,
        title: '과일도시락19',
        img: menu1,
        price: '5,000원 부터',
    },
];

function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
        <IconButton style={{
                ...style,
                cursor: 'pointer',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '64px', height: '64px',
                top: '40%', right: '-32px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                zIndex: 1000
            }}
            onClick={onClick}
        >
            <img style={{ display: 'block', width: '32px', height: '32px' }} src={Next} alt="next" />
        </IconButton>
    );
}

function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
        <IconButton style={{
                ...style,
                cursor: 'pointer',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '64px', height: '64px',
                top: '40%', left: '-32px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                zIndex: 1000
            }}
            onClick={onClick}
        >
            <img style={{ display: 'block', width: '32px', height: '32px' }} src={Prev} alt="prev" />
        </IconButton>
    );
}

// 슬릭추가
const MeunListView = () => {
    const menuList = initMenu.map((menu) => (
        <MainMenuItem
            key={menu.id}
            menuTitle={menu.title}
            menuText={menu.text}
            menuPrice={menu.price}
            src={menu.img}
        />
    ));
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>{menuList}</Slider>
        </div>
    );
};

export default MeunListView;
