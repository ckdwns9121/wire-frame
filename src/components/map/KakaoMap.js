/*global kakao*/
import React from 'react';
import Map from './Map';
import styles from './Map.module.scss';
function KakaoMap() {
    return (
        <div className={styles['kakao-map']}>
            <Map />
        </div>
    );
}
export default KakaoMap;
