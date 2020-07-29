import React, { useEffect } from 'react';
import styles from './Reserve.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import TabMenu from 'components/tab/TabMenu';
import MenuItemList from 'components/item/MenuItemList';
import Message from 'components/message/Message'
import CustomItemList from 'components/item/CustomItemList';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ReserveContainer = ({ tab='custom'}) => {


    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);

    const [price, setPrice] = React.useState(0); //맞춤 가격
    const [selectValue, setSelectValue] = React.useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
    const [result, setResult] = React.useState(false); // 예약주문 요청시 결과값.

 
    //맞춤 주문 설정하기 버튼 클릭
    const onClickCustomOrder = () => {
        setOpen(true);
    }

    //주문 종류 선택
    const onChangeSelect = (e) => {
        setSelectValue(e.target.value);
    }

    //전체 예산 입력
    const onChangePrice = (e) => {

        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value == '' || re.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }

    // 모달창 닫기
    const handleClose = () => {
        setOpen(false);
    };

    // 모달창 설정 버튼 클릭 => 맞춤 주문 설정.
    const onCustomOrder = () => {
        setOpen(false);
        if (price != 0) setResult(true);
    }
    return (
        <>
            <Header />
            <Title mainTitle={"예약주문>메뉴"} subTitle={"예약주문 메뉴 리스트"}></Title>
            <div className={styles['reserve-tab']}>
                <TabMenu/>

                {tab === 'custom' &&
                        <Message
                        msg={"전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."}
                        onClick={onClickCustomOrder}
                        isButton={true}
                    />}
            
                {tab === 'menu1' &&
                    <MenuItemList />}
                {tab === 'menu2' &&
                    <Message
                        msg={"추천메뉴가 없습니다."}
                        isButton={false}
                    />}
                {tab === 'menu3' &&
                    <Message
                        msg={"메뉴가 없습니다."}
                        isButton={false}
                    />}
            </div>
            <div className={styles['modal']}>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div className={styles['title']}>
                        <DialogTitle id="form-dialog-title">맞춤 주문 설정</DialogTitle>
                    </div>
                    <DialogTitle id="form-dialog-title">주문 종류</DialogTitle>
                    <DialogContent>
                        <div className={styles['modal-input-box']}>
                            <form>
                                <select value={selectValue} onChange={onChangeSelect}>
                                    <option value="reserve">예약주문</option>
                                    <option value="delivery">배달주문</option>
                                </select>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogTitle id="form-dialog-title">전체 예산</DialogTitle>
                    <DialogContent>
                        <div className={styles['modal-input-box']}>
                            <input value={price} onChange={onChangePrice} ></input>
                        </div>
                    </DialogContent>
                    <div className={styles['box']}>
                        <div className={styles['title']}>
                            희망 수량
                        </div>
                        <div className={styles['counter']}>
                            <button>-</button>
                            <button>0</button>
                            <button>+</button>
                        </div>
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['btn']} onClick={onCustomOrder}>
                            설정
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}
export default ReserveContainer;


{/* <Tabs> */ }
{/* 맞춤주문 설정이 되어있지 않을 때 메시지 띄우기 */ }
{/* {result ? <CustomItemList /> :
    <Message
        msg={"전체 예산과 희망 수량을 선택하시면 메뉴 구성을 추천 받으실 수 있습니다."}
        onClick={onClickCustomOrder}
        isButton={true}
    />
}
<MenuItemList />
<Message
    msg={"추천메뉴가 없습니다."}
    isButton={false}
/> */}
{/* </Tabs> */ }