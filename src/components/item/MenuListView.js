import React from "react";
import styles from './MenuList.module.scss';
import Slider from "react-slick";
import MenuItem from "./MenuItem";
import menu1 from '../svg/menu/menu1.png';
import menu2 from '../svg/menu/menu2.png';
import menu3 from '../svg/menu/menu3.png';
import menu4 from '../svg/menu/menu4.png';

import logo from 'logo.svg';

const initMenu = [
    {
        item_id: 1,
        title: "과일도시락1",
        text: "과일도시락 맛잇어",
        img: menu1,
        price: "5000원"
    },
    {
        item_id: 2,
        title: "과일도시락2",
        text: "과일도시락 맛잇어",
        img:menu2,
        price: "5000원"
    },
    {
        item_id: 3,
        title: "과일도시락3",
        text: "과일도시락 맛잇어",
        img : menu3,
        price: "5000원"
    },    
    {
        item_id: 4,
        title: "과일도시락4",
        text: "과일도시락 맛잇어",
        img: menu4,
        price: "5000원"
    },    {
        item_id: 5,
        title: "과일도시락5",
        img: menu1,
        text: "과일도시락 맛잇어",
        price: "5000원"
    },    {
        item_id: 6,
        title: "과일도시락6",
        text: "과일도시락 맛잇어",
        img:menu2,
        price: "5000원"
    },
    {
        item_id: 7,
        title: "과일도시락7",
        text: "과일도시락 맛잇어",
        img:menu3,
        price: "5000원"
    },
    {
        item_id: 8,
        title: "과일도시락8",
        text: "과일도시락 맛잇어",
        img:menu4,
        price: "5000원"
    },
    {
        item_id: 9,
        title: "과일도시락19",
        text: "과일도시락 맛잇어",
        img:menu1,
        price: "5000원"
    },

]


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    console.log(className);
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
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
        style={{ ...style, display: "block", background: "black", border:"1px solid blue"}}
        onClick={onClick}
      />
    );
  }
  


// 슬릭추가 
const MeunListView = () => {

    const menuList = initMenu.map(menu => (
        <MenuItem key = {menu.id} menuTitle={menu.title} menuText={menu.text} menuPrice={menu.price} src={menu.img} />
    ));

    const settings = {
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={styles['container']}>
            <Slider {...settings}>
                {menuList}
            </Slider>
        </div>
    );
}


export default MeunListView;