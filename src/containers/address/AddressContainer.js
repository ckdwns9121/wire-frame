import React, { useState, useRef, useEffect, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BsSearch } from 'react-icons/bs';
import styles from './Address.module.scss';
import Header from 'components/header/Header';
import AddrItemList from 'components/address/AddrItemList';
import DeliveryItemList from 'components/address/DeliveryItemList';
import { getDeliveryList } from '../../api/address/address';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
  const [search, serSearch] = useState(""); //검색
  const [selectAddr, setSelectAddr] = useState(""); //선택
  const [detailAddr, setDetailAddr] = useState(""); //상세주소
  const [addrs, setAddrs] = useState(''); // 검색 리스트
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [open, setOpen] = React.useState(false);
  const [delivery_addrs, setDeliveryAddrs] = useState([]);

  useEffect(() => {
    calltest();
  }, [])

  const calltest = useCallback(async () => {
    const token = sessionStorage.getItem("access_token");
    const res = await getDeliveryList(token);
    console.log(res.data.query);
    setDeliveryAddrs(res.data.query);
  }, []);


  const handleClickOpen = useCallback(() => {
    if (search == "") {
      alert("검색어를 입력해주세요!!.");
      return;
    }
    else {
      setOpen(true);
      onSearchClick();
    }
  }, [search,open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleKeyPress = useCallback((e) => {
    if (e.key == 'Enter') {
      handleClickOpen();
    }
  },[search]); //마운트시 함수생성

  const onInsertAddr = useCallback(() => {
    console.log(detailAddr);
    setOpen(false);
    setDetailAddr("");
  }, [open, detailAddr]);

  const onClickAddrItem = useCallback((data) => {
    setSelectAddr(data);
    alert(data);
  }, [selectAddr]);

  const onChangeSearch = useCallback(e => {
    serSearch(e.target.value);
  }, [search]);
  const onChangeDetail = e => {
    setDetailAddr(e.target.value);
  }
  const onSearchClick =useCallback(async () => {

    if (search == "") {
      alert("검색어를 입력해주세요.~");
      return;
    }
    else {
      const result = await callApi();
      setAddrs(result);
    }
  },[search,addrs]); //search 혹은 addrs 가 바뀌었을때만 함수생성

  const callApi = useCallback(() => {
    return fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${search}&confmKey=${key}=&resultType=json`)
      .then(res => res.json())
      .then(json => json.results.juso)
      .catch(err => console.log(err));
  },[search]); //search가 바뀌었을때 함수생성

  return (
    <>
      <Header />
      <div className={styles['container']}>
        <h1 onClick={calltest}>배달지 검색</h1>
        <div className={styles['addr-input']}>
          <input className={styles['input-box']} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" value={search} onChange={onChangeSearch} onKeyPress={handleKeyPress} />
          <div className={styles['search-btn']} onClick={handleClickOpen} >주소검색</div>
        </div>
        <div className={styles['addr-list']}>
          <h3>최근 배달 주소</h3>
          <DeliveryItemList addrs={delivery_addrs} />
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
              <input className={styles['modal-input']} type="text" value={search} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" onChange={onChangeSearch} onKeyPress={handleKeyPress}></input>
              <div className={styles['search-btn']} onClick={onSearchClick} ><BsSearch /></div>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['addrs-box']}>
              {addrs ? `${addrs.length}개의 검색결과가 있습니다.` : "0개의 검색결과가 있습니다."}
              <div className={styles['addrs-list']}>
                {addrs ? <AddrItemList addrs={addrs} onClick={onClickAddrItem} /> : ""}
              </div>
              {selectAddr ? selectAddr : ""}
              <input className={styles['modal-input']} type="text" value={detailAddr} placeholder="상세 주소를 입력하세요" onChange={onChangeDetail}></input>
            </div>
          </DialogContent>
          <DialogContent>
            <div className={styles['setting-btn']} onClick={onInsertAddr}>
              이 주소로 배달지 설정
          </div>
          </DialogContent>
        </Dialog>
      </div>

    </>
  );
};

export default AddressContainer;


