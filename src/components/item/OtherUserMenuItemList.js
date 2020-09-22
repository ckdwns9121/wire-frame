import React from 'react';
import styles from './OtherMenu.module.scss';
import Slider from 'react-slick';
import OtherUserMenuItem from './OtherUserMenuItem';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'red' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    console.log(props);
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'black',
                border: '1px solid blue',
            }}
            onClick={onClick}
        />
    );
}

// 슬릭추가
const OtherUserMenuItemList = ({ menu_list }) => {
    /*
        슬릭 추가시 <slider>가 태그를 생성시킴
        그래서 따로 list를 렌더 해야함 
        여기서 didmount로 메뉴 리스트 받아오기
    */

    const menuList = menu_list.map((menu) => (
        <OtherUserMenuItem
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
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>{menuList}</Slider>
        </div>
    );
};

export default OtherUserMenuItemList;
