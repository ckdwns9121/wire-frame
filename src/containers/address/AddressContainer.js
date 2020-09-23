import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Address.module.scss';
import DeliveryItemList from '../../components/address/DeliveryItemList';
import { searchIcon } from 'components/svg/header';
import AddressModal from '../../components/modal/AddrModal';
import { insertAddress,deleteAddr,selectAddress, searchAddress,getDeliveryList } from '../../api/address/address';
import {useStore} from '../../hooks/useStore';
import {get_address} from '../../store/address/address';

const AddressContainer = () => {

    const dispatch= useDispatch();
    const user_token = useStore();
    const [searchAddr, serSearch] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [addrs, setAddrs] = useState(''); // 검색 리스트

    const [open, setOpen] = React.useState(false);
    const [delivery_addrs, setDeliveryAddrs] = useState([]);

    //최근 선택한 주소지 들고오기
    const callDeliveryList = useCallback(async () => {
        try{
        const res = await getDeliveryList(user_token);
        console.log(res);
        setDeliveryAddrs(res.data.query);

        }
        catch(e){
            console.log(e);
        }
    }, [user_token]);

    useEffect(() => {
        callDeliveryList();
    }, [callDeliveryList]);


    //검색버튼 클릭
    const onSearchClick = useCallback(async () => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요.~');
            return;
        } else {
            const result = await callSearchApi();
            setAddrs(result);
        }
    }, [searchAddr]); //search 혹은 addrs 가 바뀌었을때만 함수생성

    //검색 api 호출
    const callSearchApi = async () => {
        const res = await searchAddress(searchAddr);
        return res;
    };


    //검색 모달 오픈
    const handleOpen = useCallback(() => {
        if (searchAddr === '') {
            alert('검색어를 입력해주세요!!.');
            return;
        } else {
            setOpen(true);
            onSearchClick();
        }
    }, [searchAddr, onSearchClick]);


    //모달창 닫기
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);


    //엔터키 추가
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleOpen();
            }
        },
        [handleOpen],
    ); 

    const onClickInsertAddr = useCallback(() => {
        console.log(detailAddr);
        setOpen(false);
        setDetailAddr('');
    }, [detailAddr]);


    //검색어 변경
    const onChangeSearchAddr = useCallback((e) => {
        serSearch(e.target.value);
    }, []);


    //상세주소 변경
    const onChangeDetail = (e) => {
        setDetailAddr(e.target.value);
    };



    //선택한 주소지로 설정
    const onClickDeliveyAddr = useCallback(async (delivery_id ,addr1) =>{
       try{ 
            const res = await selectAddress(user_token, delivery_id);
            console.log(res);
            dispatch(get_address(addr1));
       }
       catch(e){
           console.error(e);
       }
    },[]);

    //주소지 삭제
    const onRemoveAddr = useCallback(async (delivery_id) =>{
        try{
            const res =  await deleteAddr(user_token,delivery_id);
            console.log(res);
            setDeliveryAddrs((list) => list.filter(item => item.delivery_id !==delivery_id));
            
        }
        catch(e){
            console.log(e);
        }
    },[user_token])


    // 검색시 나오는 주소를 클릭했을때 
    const onClickAddrItem = useCallback((data) => {
        setSelectAddr(data);
    }, []);

        //최근 주소지에 추가
    const onClickDeliveryAddrInsert = async () => {
        setOpen(false);
        try{
        const res = await insertAddress(
            user_token,
            13252,
            selectAddr,
            detailAddr,
            0,
            37.182184,
            129.227345,
        );
        callDeliveryList();
        }
        catch(e){
            console.error(e);
        }
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
                <div className={styles['content']}>
                    <div className={styles['addr-title']}>최근 배달 주소</div>
                    <div className={styles['addr-list']}>
                        <DeliveryItemList 
                        addrs={delivery_addrs}
                        onRemove ={onRemoveAddr}  
                        onClick={onClickDeliveyAddr}/>
                    </div>
                </div>
            </div>
            <AddressModal
                open={open}
                handleClose={handleClose}
                onClick={onClickDeliveryAddrInsert}
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
