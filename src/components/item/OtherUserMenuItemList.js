import React from 'react';
import styles from './OtherMenu.module.scss';
import Slider from 'react-slick';
import OtherUserMenuItem from './OtherUserMenuItem';


// 슬릭추가
const OtherUserMenuItemList = ({ menu_list ,onClick}) => {
    /*
        슬릭 추가시 <slider>가 태그를 생성시킴
        그래서 따로 list를 렌더 해야함 
        여기서 didmount로 메뉴 리스트 받아오기
    */

    const menuList = menu_list.map((item) => (
        <OtherUserMenuItem
            key={item.item_id}
            {...item}
        />
    ));

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: menu_list.length > 5 ? 5 : menu_list.length,
        slidesToScroll: 5,
        slidePerRow: 1,
        varialbeWidth: !(menu_list.length >= 5)
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>{menuList}</Slider>
        </div>
    );
};

export default OtherUserMenuItemList;
