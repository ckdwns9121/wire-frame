import React, { useState, useEffect, useCallback } from 'react';
import Map from './Map';
import styles from './Map.module.scss';
import { searchIcon } from '../svg/header';
import { getStroeList } from '../../api/store/store';
import { stringToTel } from '../../lib/formatter';

import { ButtonBase } from '@material-ui/core';
import { useModal } from '../../hooks/useModal';
import Loading from '../assets/Loading';
import Message from '../assets/Message';

function KakaoMap() {

    const openModal = useModal();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [storeList, setStoreList] = useState([]);
    const [selectStore, setSelectStore] = useState(0);
    const onChangeSearch = (e) => setSearch(e.target.value);

    const onClickSearch = async () => {
        setLoading(true);
        try {
            const res = await getStroeList(search);
            const store_list = res.data.query;
            const select_store = store_list.length ? store_list[0].shop_id : 0;
            setStoreList(store_list);
            setSelectStore(select_store);
        } catch (e) {
            openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
        }
        setLoading(false);
    };
    const handleChangeSelect = useCallback(id => setSelectStore(id), []);
    const onKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if (e.key === 'Enter') {
            onClickSearch();
        }
    };

    useEffect(() => {
        onClickSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles['kakao-map']}>
            <Map storeList={storeList} selectStore={selectStore} />
            <div className={styles['map-area']}>
                <div className={styles['modal']} data-aos="fade-up">
                    <h3 className={styles['title']}>지점찾기</h3>
                    <div className={styles['search-input']}>
                        <div className={styles['input']}>
                            <input
                                className={styles['search']}
                                value={search}
                                onChange={onChangeSearch}
                                onKeyPress={onKeyPress}
                            />
                            <img
                                className={styles['icon']}
                                onClick={onClickSearch}
                                src={searchIcon}
                                alt="검색"
                            />
                            <p className={styles['count']}>
                                총 <b>{storeList.length}개</b>의 지점을
                                찾았습니다.
                            </p>
                            <div className={styles['list']}>
                                <Loading open={loading} />
                                {storeList.length !== 0 ?
                                    <StoreList storeList={storeList} handleClick={handleChangeSelect}/>
                                    : <Message msg="찾으시는 지점이 없습니다" size={200} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StoreItem({ name, hp, addr1, handleClick }) {
    return (
        <ButtonBase className={styles['item']} onClick={handleClick}>
            <p className={styles['name']}>{name}</p>
            <p className={styles['location']}>{addr1}</p>
            <p className={styles['tel']}>{stringToTel(hp)}</p>
        </ButtonBase>
    );
}
function StoreList({ storeList, handleClick }) {
    const list = storeList.map(item => (
            <StoreItem
                name={item.shop_name}
                hp={item.shop_hp}
                addr1={item.shop_addr1}
                handleClick={() => handleClick(item.shop_id)}
                key={item.shop_id}
            />
        ));

    return <div className={styles['store-list']}>{list}</div>;
}
export default KakaoMap;
