import React from 'react';
import styles from './MenuList.module.scss';
import Slider from 'react-slick';
import MainMenuItem from './MainMenuItem';

import Prev from '../svg/menu/prev.svg';
import Next from '../svg/menu/next.svg';
import { IconButton } from '@material-ui/core';

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
const MeunListView = ({menuList,onClick}) => {
    const list = menuList.map((menu) => (
        <MainMenuItem
            key={menu.item_id}
            item_name={menu.item_name}
            item_price={menu.item_price}
            ca_id={menu.ca_id}
            src={menu.item_img}
            onClick={()=>onClick(menu.item_id)}
        />
    ));
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>{list}</Slider>
        </div>
    );
};

export default MeunListView;
