import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Address.module.scss';
import DeliveryItemList from '../../components/address/DeliveryItemList';
import { searchIcon } from 'components/svg/header';
import AddressModal from '../../components/modal/AddrModal';
import {
    insertAddress,
    deleteAddr,
    selectAddress,
    searchAddress,
    getDeliveryList,
} from '../../api/address/address';
import { useStore } from '../../hooks/useStore';
import { get_address } from '../../store/address/address';
import { modalOpen } from '../../store/modal';
import Message from '../../components/assets/Message';
import produce from 'immer';
import { noAuthAddCart } from '../../api/noAuth/cart';

const AddressContainer = () => {
    const modalDispatch = useDispatch();

    const openMessage = useCallback(
        (isConfirm, title, text, handleClick = () => {}) => {
            modalDispatch(modalOpen(isConfirm, title, text, handleClick));
        },
        [modalDispatch],
    );

    const dispatch = useDispatch();
    const user_token = useStore(false);
    const [searchAddr, serSearch] = useState(''); //검색
    const [selectAddr, setSelectAddr] = useState(''); //선택
    const [detailAddr, setDetailAddr] = useState(''); //상세주소
    const [search_list, setSearchList] = useState(''); // 검색 리스트
    const [delivery_list, setDeliveryList] = useState([]);

    const [open, setOpen] = React.useState(false);

    //최근 선택한 주소지 들고오기
    const callDeliveryList = useCallback(async () => {
        //회원 주소 설정
        if (user_token) {
            console.log('회원');
            try {
                const res = await getDeliveryList(user_token);
                console.log(res);
                setDeliveryList(res.data.query);
            } catch (e) {
                console.log(e);
            }
        }
        //비회원
        else {
            const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
            if (noAuthAddrs) {
                setDeliveryList(noAuthAddrs);
            }
        }
    }, [user_token]);

    useEffect(() => {
        callDeliveryList();
    }, [callDeliveryList]);

    //검색버튼 클릭
    const onClickSearch = useCallback(async () => {
        if (searchAddr !== '') {
            const result = await callSearchApi();
            setSearchList(result);
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
            openMessage(false, '검색어가 없습니다!', '검색어를 입력해 주세요.');
            return;
        } else {
            setOpen(true);
            onClickSearch();
        }
    }, [searchAddr, onClickSearch]);

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
        setOpen(false);
        setDetailAddr('');
    }, []);

    //검색어 변경
    const onChangeSearchAddr = useCallback((e) => {
        serSearch(e.target.value);
    }, []);

    //상세주소 변경
    const onChangeDetail = (e) => {
        setDetailAddr(e.target.value);
    };

    //선택한 주소지로 설정
    const onClickDeliveyAddr = useCallback(
        (delivery_id, addr1) => {
            openMessage(
                true,
                '선택한 주소지로 설정하시겠습니까?',
                '',
                async () => {
                    if (user_token) {
                        try {
                            const res = await selectAddress(
                                user_token,
                                delivery_id,
                            );
                            console.log(res);
                            dispatch(get_address(addr1));
                            callDeliveryList();
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        const noAuthAddrs = JSON.parse(
                            localStorage.getItem('noAuthAddrs'),
                        );

                        noAuthAddrs.map((item) => (item.active = 0));
                        noAuthAddrs[delivery_id].active = 1;
                        console.log(noAuthAddrs);

                        let tmp = noAuthAddrs[delivery_id];
                        noAuthAddrs.splice(delivery_id, 1);
                        noAuthAddrs.unshift(tmp);

                        localStorage.setItem(
                            'noAuthAddrs',
                            JSON.stringify(noAuthAddrs),
                        );
                        const temp = JSON.parse(
                            localStorage.getItem('noAuthAddrs'),
                        );
                        setDeliveryList(temp);
                        dispatch(get_address(addr1));
                    }
                },
            );
        },
        [callDeliveryList, user_token],
    );

    //주소지 삭제
    const onRemoveAddr = useCallback(
        (delivery_id) => {
            openMessage(true, '해당 주소를 삭제하시겠습니까?', '', async () => {
                if (user_token) {
                    try {
                        await deleteAddr(user_token, delivery_id);
                        const index = delivery_list.findIndex(
                            (item) => item.delivery_id === delivery_id,
                        );
                        if (delivery_list[index].active === 1) {
                            dispatch(get_address(null));
                        }
                        setDeliveryList((list) =>
                            list.filter(
                                (item) => item.delivery_id !== delivery_id,
                            ),
                        );
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    console.log(delivery_id);
                    const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
                    if(noAuthAddrs){
                     //선택한 주소가 현재 활성 주소일시.
                      if (noAuthAddrs[delivery_id].active === 1) {
                        //배달지 없음으로 설정
                        dispatch(get_address(null));
                      }
                    //선택한 주소를 제일 쉬로 올리기.
                    noAuthAddrs.splice(delivery_id, 1);
                    localStorage.setItem( 'noAuthAddrs',JSON.stringify(noAuthAddrs));
                    const temp = JSON.parse(localStorage.getItem('noAuthAddrs'));
                    setDeliveryList(temp);
                    }
                }
            });
        },
        [user_token, delivery_list],
    );

    // 검색리스트에 나오는 주소를 클릭했을때
    const onClickAddrItem = useCallback(
        (data, index) => {
            setSelectAddr(data);
            const new_list = search_list.map((item) => ({
                ...item,
                active: false,
            }));
            setSearchList(
                produce(new_list, (draft) => {
                    draft[index].active = true;
                }),
            );
            console.log(search_list);
        },
        [search_list],
    );

    //최근 주소지에 추가
    const onClickDeliveryAddrInsert = async () => {
        if (detailAddr === '') {
            openMessage(
                false,
                '상세 주소를 입력해주세요',
                '상세주소가 입력되지 않았습니다.',
            );
        } else {
            openMessage(
                true,
                '이 주소로 배달지를 설정하시겠습니까?',
                '',
                async () => {
                    if (user_token) {
                        try {
                            const res = await insertAddress(
                                user_token,
                                13252,
                                selectAddr,
                                detailAddr,
                                0,
                                37.182184,
                                129.227345,
                            );
                            if (res.data.msg === '성공') {
                                callDeliveryList();
                                dispatch(get_address(selectAddr));
                                setOpen(false);
                            } else {
                                openMessage(
                                    false,
                                    res.data.msg,
                                    '주변 매장정보를 확인해 주세요.',
                                );
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));

                        if (noAuthAddrs) {
                            noAuthAddrs.map((item) => (item.active = 0));
                            noAuthAddrs.push({
                                addr1: selectAddr,
                                addr2: detailAddr,
                                active: 1,
                            });
                            localStorage.setItem(
                                'noAuthAddrs',
                                JSON.stringify(noAuthAddrs.reverse()),
                            );
                        } else {
                            localStorage.setItem(
                                'noAuthAddrs',
                                JSON.stringify([
                                    {
                                        addr1: selectAddr,
                                        addr2: detailAddr,
                                        active: 1,
                                    },
                                ]),
                            );
                        }
                        const test2 = JSON.parse(
                            localStorage.getItem('noAuthAddrs'),
                        );
                        dispatch(get_address(selectAddr));
                        setDeliveryList(test2);
                        setOpen(false);
                    }
                },
            );
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
                        {delivery_list.length === 0 ? (
                            <Message
                                msg={'최근 배달 주소가 없습니다.'}
                                size={350}
                            />
                        ) : (
                            <DeliveryItemList
                                addrs={delivery_list}
                                onRemove={onRemoveAddr}
                                onClick={onClickDeliveyAddr}
                                user_token={user_token}
                            />
                        )}
                    </div>
                </div>
            </div>
            <AddressModal
                open={open}
                handleClose={handleClose}
                onClickSearch={onClickSearch}
                onClick={onClickDeliveryAddrInsert}
                searchAddr={searchAddr}
                onChangeAddr={onChangeSearchAddr}
                handleKeyPress={handleKeyPress}
                addrs={search_list}
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
