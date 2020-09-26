/*global kakao*/
import React, { useState, useEffect } from 'react';
import Map from './Map';
import styles from './Map.module.scss';
import { searchIcon } from '../svg/header';
import { getStroeList } from '../../api/store/store';
import AOS from 'aos';
import { stringToTel } from '../../lib/formatter';

import 'aos/dist/aos.css';

function KakaoMap() {

    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    const [search, setSearch] = useState('');
    const [store_list,setStoreList] = useState([]);
    const onChangeSearch = (e) => setSearch(e.target.value);

    const onClickSearch = async () => {
        try {
            const res = await getStroeList(search);
            console.log(res);
            setStoreList(res.data.query);
        }
        catch (e) {
            console.log(e);
        }
    }


    const handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if (e.key === 'Enter') {
            onClickSearch();
        }
    }
    return (
        <div className={styles['kakao-map']}>
            <Map  store_list={store_list}/>
            <div className={styles['map-area']}>
                <div className={styles['modal']} data-aos='fade-up'>
                    <h3 className={styles['title']}>지점찾기</h3>
                    <div className={styles['search-input']}>
                        <div className={styles['input']}>
                            <input className={styles['search']} value={search} onChange={onChangeSearch} onKeyPress={handleKeyPress} />
                            <img
                                className={styles['icon']}
                                onClick={onClickSearch}
                                src={searchIcon}
                                alt="검색"
                            />
                    <p className={styles['count']}>총 <b>{store_list.length}</b>개의 지점을 찾았습니다.</p>
                            <div className={styles['list']}>
                            {store_list.length!==0 &&
                            <StroeList store_list={store_list}/>
                            }
                            </div>
                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StoreItem({name,hp,addr1}) {
    return (
        <div className={styles['item']}>
            <p className={styles['name']}>{name}</p>
            <p className={styles['location']}>{addr1}</p>
            <p className={styles['tel']}>{stringToTel(hp)}</p>
        </div>
    )
}
function StroeList({store_list}){
    console.log(store_list);
    const list = store_list.map((item)=>{
        return <StoreItem name={item.shop_name} hp={item.shop_hp} addr1={item.shop_addr1} key={item.shop_name}/>
    })

    return(
        <div className={styles['store-list'] }>{list}</div>
    )
}
export default KakaoMap;
