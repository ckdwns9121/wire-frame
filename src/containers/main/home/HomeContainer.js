import React from "react";
import { Paths } from "paths";
import { useHistory } from "react-router-dom";
import styles from "./HomeContainer.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import MenuItemList from "components/item/MenuItemList";
import TempleteItmeList from "components/item/TempleteItemList";
import OrderButton from "components/button/OrderButton";
import HomeSlick from "./HomeSlick";
import MenuListView from "components/item/MenuListView";
import { useSelector } from "react-redux";
import {
  bannerImg,
  backImg,
  orderServiceImg,
  templateImg,
} from "../../../components/svg/home";
// import bannerImg from "components/svg/home/banner.png";
// import templateImg from 'components/svg/home/'
// import background from "components/svg/home/background.png";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const HomeContainer = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const goToReverve = () => {
    history.push(`${Paths.ajoonamu.reserve}/custom`);
  };
  return (
    <>
      <div className={styles["carousel"]}>
        <HomeSlick />
      </div>
      <div className={styles["container"]}>
        <Banner
          title={"메뉴 추천 받아보기"}
          subtitle={"샌달에서 간편하게 추천해드려요"}
        />
        <div className={styles["menu-list"]}>
          <MenuListView />
        </div>
        <div className={styles["banner-img"]}>
          <img src={bannerImg} alt="배너" />
        </div>
        <div className={styles["order"]}>
          <div className={styles["box"]}>
            <img className={styles["back-img"]} src={backImg}></img>
          </div>
          <div className={cx("box")}>
            <div className={styles["service"]}>
              <div className={styles["pd-box"]}>
                <div className={styles["title"]}>기업조식 정기배송 서비스</div>
                <div className={styles["sub-title"]}>
                  샌달과 하루를 효율적으로 시작해보세요
                </div>
                <div className={styles["order-btn"]}>자세히보기</div>
              </div>
            </div>
          </div>
        </div>
        <Banner
          title={"샌달의 서비스"}
          subtitle={"샌달은 고객님께 신선함까지 함께 배달해드려요"}
        />
        <div className={styles["service-box"]}>
          <div className={styles["service-type"]}>
            <div className={styles["box"]}>
              <img
                className={styles["box-img"]}
                src={orderServiceImg}
                alt="order"
              ></img>
              <div className={styles["box-text"]}>
                <div className={styles['title']}>
                익일 배달서비스 가능
                </div>
                <div className={styles['sub-title']}>
                익일 배달서비스를 활용해보세요.
                </div>
              </div>
            </div>
          </div>
          <div className={styles["service-type"]}>
            <div className={styles["box"]}>
              <img
                className={styles["box-img"]}
                alt="template"
                src={templateImg}
              ></img>
               <div className={styles["box-text"]}>
                <div className={styles['title']}>
                익일 배달서비스 가능
                </div>
                <div className={styles['sub-title']}>
                익일 배달서비스를 활용해보세요.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Banner({ title, subtitle, text }) {
  return (
    <div className={styles["banner"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["sub-title"]}>{subtitle}</div>
      <div className={styles["text"]}>{text}</div>
    </div>
  );
}

export default HomeContainer;
