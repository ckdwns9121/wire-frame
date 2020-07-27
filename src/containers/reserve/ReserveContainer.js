import React from 'react';
import styles from './Reserve.module.scss';
import Header from 'components/header/Header';
import Title from 'components/titlebar/Title';
import Tabs from 'components/nav/Tabs';
import MenuItemList from 'components/listbox/MenuItemList';
import ReserveMsg from 'components/message/ReserveMsg'
import CustomItemList from 'components/listbox/CustomItemList';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ReserveContainer = () => {

    
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);

    const [price, setPrice] = React.useState(0); //맞춤 가격
    const [selectValue, setSelectValue] = React.useState("reserve"); //사용자 선택 값 1.예약주문 2.배달주문
    const [result ,setResult] =React.useState(false); // 예약주문 요청시 결과값.


    const onClickCustomOrder = () => {
        setOpen(true);
    }
    const onChangeSelect = (e) => {
        setSelectValue(e.target.value);
    }
    const onChangePrice = (e) => {

        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value == '' || re.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };
    const onCustomOrder =()=>{
        setOpen(false);
        if(price!=0) setResult(true);
    }
    return (
        <>
            <Header></Header>
            <Title mainTitle={"예약주문>메뉴"} subTitle={"예약주문 메뉴 리스트"}></Title>
            <div className={styles['reserve-tab']}>
                <Tabs>
                  {result ? <CustomItemList/>: <ReserveMsg onClick={onClickCustomOrder} /> }
                    <MenuItemList />
                </Tabs>
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
                            희망 예산
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