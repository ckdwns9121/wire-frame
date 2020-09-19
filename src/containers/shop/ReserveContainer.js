import React, { useEffect,useState } from "react";
import { Paths } from "paths";
import styles from "./Reserve.module.scss";
import TabMenu from "components/tab/TabMenu";
import MenuItemList from "components/item/MenuItemList";
import Message from "components/message/Message";
import Counter from "components/counter/Counter";
import CustomItemList from "components/item/CustomItemList";
import {getCustomMenuList,getMenuList } from '../../api/menu/menu';

import PreferModal from "../../components/modal/PreferModal";
import { useHistory } from "react-router";

import Typography from "@material-ui/core/Typography";
import ShopBanner from "../../components/svg/shop/shop_banner.png";

const tabInit = [
  {
    url: `${Paths.ajoonamu.shop}?menu=0`,
    name: "추천메뉴",
  },
  {
    url: `${Paths.ajoonamu.shop}?menu=1`,
    name: "분류1",
  },
  {
    url: `${Paths.ajoonamu.shop}?menu=2`,
    name: "분류2",
  },
  {
    url: `${Paths.ajoonamu.shop}?menu=3`,
    name: "분류3",
  },
  {
    url: `${Paths.ajoonamu.shop}?menu=4`,
    name: "분류4",
  },
];

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const ReserveContainer = ({ menu = "0" }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(0); //맞춤 가격
  const [desireQuan, setDesireQuan] = useState(0); //희망수량
  const [orderType, setOrderType] = useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
  const [tab_index, setTab] = useState(parseInt(menu));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error , setError] = useState(false);
  const [customMenuList, setCustomMenuList] = useState([]);
  const [menuList,setMenuList] = useState([]);
  const handleOpen=()=>setOpen(true);
  const handleClose = () => setOpen(false);

  

  const getMenuListApi =async()=>{
    const res = await getMenuList();
    setMenuList(res);
  }




  const onChangeIndex = (e, index) => {
    setTab(index);
  };

  //주문 종류 선택
  const onChangeOrderType = (e) => {
    setOrderType(e.target.value);
  };


  const onClickCustomOrder = () => {
    console.log("GD");
    setOpen(false);
    getCustomList();
    };

    const getCustomList = async () => {
      setLoading(true);
      const res = await getCustomMenuList();
      setCustomMenuList(res);
      setLoading(false);
  };
  //전체 예산 입력
  const onChangeBudget = (e) => {
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (e.target.value === "" || re.test(e.target.value)) {
      setBudget(e.target.value);
    }
  };



  // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
  const onCustomOrder = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getCustomList();
    getMenuListApi();
  },[])



  const renderContent = () => {
    const list = tabInit.map((tab, index) => (
      <TabPanel key={index}value={tab_index} index={index} children={
          <span>
          {tab.name==="추천메뉴"?(
            <>
              {
                customMenuList.length!==0 ? <CustomItemList menuList={customMenuList}/> : 
                <Message 
                msg="전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."
                isButton={true}
                buttonName={"맞춤주문 설정하기"}
                onClick={handleOpen}
                />
              }
            </>
          )  :
          (
            <>
            {menuList.length!==0 && 
              <MenuItemList menu_list={menuList}/>
            }
            </>
          )
        }
          </span>
      }/>
    ));
    return <>{list}</>;
  };

  return (
    <>
      <div className={styles["banner"]}>
        <img className={styles["shop-banner"]} src={ShopBanner} alt="banner" />
      </div>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["title"]}>예약주문 메뉴리스트</div>
          <TabMenu tabs={tabInit} index={tab_index} onChange={onChangeIndex} />
          <div className={styles["shop"]}>{renderContent()}</div>
        </div>
      </div>

      <PreferModal
        open={open}
        handleClose={handleClose}
        itemType={orderType}
        onChangeType={onChangeOrderType}
        budget={budget}
        onChangeBudget={onChangeBudget}
        desireQuan={desireQuan}
        onClickCustomOrder={onClickCustomOrder}
      />
    </>
  );
};

export default ReserveContainer;
