import React, { useState, usee, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from './Address.module.scss';
import Header from 'components/header/Header';
import AddrItem from 'components/Address/AddrItem';
import AddrItemList from 'components/Address/AddrItemList';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import key from "./key";


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


const key = "devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE";
const AddressContainer = () => {
  const [userAddr, setUserAddr] = useState(""); //검색
  const [selectAddr , setSelectAddr] = useState(""); //선택
  const [detailAddr,setDetailAddr] = useState(""); //상세주소
  const [addrs, setAddrs] = useState(''); // 검색 리스트
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onSearch();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickAddrItem =(data)=>{
    console.log("넘어오나");
    console.log(data);
    setSelectAddr(data);
    console.log(selectAddr);
  }

  const setInputText = e => {
    setUserAddr(e.target.value);
    console.log(addrs);
  };

  const findAddress = async () => {
    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${userAddr}&confmKey=${key}=&resultType=json`
    )
      .then(res => res.json())
      .then(json => console.log(json.results))
      .catch(err => console.log(err));
  };

  const onSearch = async () => {
    const result = await callApi();
    console.log("결과");
    setAddrs(result);

  }


  const callApi = () => {
    return fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${userAddr}&confmKey=${key}=&resultType=json`)
      .then(res => res.json())
      .then(json => json.results.juso)
      .catch(err => console.log(err));
  }
  useEffect(() => {
    console.log("재 렌더");
  }, [addrs,selectAddr])


  return (
    <>
      <Header />
      <div className={styles['addr']}>
        <h1>배달지 검색</h1>
        <div className={styles['addr-input']}>
          <input className={styles['input-box']} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" value={userAddr} onChange={setInputText} />
          <div className={styles['search-btn']} onClick={handleClickOpen}>주소검색</div>
        </div>
        <div className={styles['addr-list']}>



        </div>
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
            <DialogTitle id="form-dialog-title">배달 받을 주소</DialogTitle>
          </div>

          <DialogContent>
            <div className={styles['modal-input-box']}>
              <input className={styles['modal-input']} type="text" value={userAddr} placeholder="주소를 입력" onChange={setInputText}></input>
              <div className={styles['search-btn']} color="primary" onClick={handleClickOpen} variant="outlined">검색</div>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['addrs-box']}>
            {addrs ? `검색결과 ${addrs.length} 개` : "검색결과 0 개"}
            <div className={styles['addrs-list']}>
              {addrs ? <AddrItemList addrs={addrs} onClick={onClickAddrItem}/> : ""}
            </div>
            {selectAddr}
            <input className={styles['modal-input']} type="text"  placeholder="상세 주소를 입력하세요"></input>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['setting-btn']} onClick={handleClose}>
              이 주소로 배달지 설정
          </div>
          </DialogContent>
        </Dialog>
      </div>

    </>
  );
};

export default AddressContainer;