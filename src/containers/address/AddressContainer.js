import React, { useState, useEffect, useCallback } from 'react';
import styles from './Address.module.scss';
import DeliveryItemList from 'components/address/DeliveryItemList';
import { getDeliveryList } from '../../api/address/address';
import { searchIcon } from 'components/svg/header';
import AddressModal from 'components/modal/AddrModal';

const key = 'devU01TX0FVVEgyMDIwMDcyMzE4MTUzMzEwOTk4NzE';

const AddressContainer = () => {
    const [searchAddr, serSearch] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [addrs, setAddrs] = useState(''); // 검색 리스트

    const [open, setOpen] = React.useState(false);
    const [delivery_addrs, setDeliveryAddrs] = useState([]);

    const calltest = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        const res = await getDeliveryList(token);
        console.log(res.data.query);
        setDeliveryAddrs(res.data.query);
    }, []);

    useEffect(() => {
        calltest();
    }, [calltest]);

    const callApi = useCallback(() => {
      return fetch(
          `http://www.juso.go.kr/addrlink/addrLinkApi.do?currrentPage=1&countPerPage=100&keyword=${searchAddr}&confmKey=${key}=&resultType=json`,
      )
          .then((res) => res.json())
          .then((json) => json.results.juso)
          .catch((err) => console.log(err));
  }, [searchAddr]); //search가 바뀌었을때 함수생성
  
    const onSearchClick = useCallback(async () => {
      if (searchAddr === '') {
          alert('검색어를 입력해주세요.~');
          return;
      } else {
          const result = await callApi();
          setAddrs(result);
      }
  }, [searchAddr, callApi]); //search 혹은 addrs 가 바뀌었을때만 함수생성

    const handleOpen = useCallback(() => {
      if (searchAddr === '') {
          alert('검색어를 입력해주세요!!.');
          return;
      } else {
          setOpen(true);
          onSearchClick();
      }
  }, [searchAddr, onSearchClick]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleOpen();
            }
        },
        [handleOpen],
    ); //마운트시 함수생성

    const onClickInsertAddr = useCallback(() => {
        console.log(detailAddr);
        setOpen(false);
        setDetailAddr('');
    }, [detailAddr]);

    const onClickAddrItem = useCallback(
        (data) => {
            setSelectAddr(data);
        },
        [],
    );
    const onChangeSearchAddr = useCallback(
        (e) => {
            serSearch(e.target.value);
        },
        [],
    );

    const onChangeDetail = (e) => {
        setDetailAddr(e.target.value);
    };



    return (
        <>
            <div className={styles['input-banner']}>
                <div className={styles['addr-input']}>
                    <input
                        className={styles['search-input']}
                        placeholder="예) 아주나무동12-3 또는 아주나무 아파트"
                        value={searchAddr}
                        onChange={onChangeSearchAddr}
                        onKeyPress={handleKeyPress}
                    />
                    <img
                        className={styles['icon']}
                        onClick={handleOpen}
                        src={searchIcon}
                        alt="search"
                    />
                </div>
            </div>
            <div className={styles['container']}>
                <div className={styles['addr-list']}>
                    <div className={styles['addr-title']}>최근 배달 주소</div>
                    <DeliveryItemList addrs={delivery_addrs} />
                </div>
            </div>
            <AddressModal
                open={open}
                handleClose={handleClose}
                searchAddr={searchAddr}
                onChangeAddr={onChangeSearchAddr}
                handleKeyPress={handleKeyPress}
                addrs={addrs}
                onClickAddrItem={onClickAddrItem}
                selectAddr={selectAddr}
                detailAddr={detailAddr}
                onChangeDetail={onChangeDetail}
                onInsertAddr={onClickInsertAddr}
            />
        </>
    );
};

export default AddressContainer;
