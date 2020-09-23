/*global kakao*/
import React, { useEffect } from 'react';

export default function Map() {
    useEffect(() => {
        mapScript();
    }, []);

    const mapScript = () => {
        let container = document.getElementById('map');
        let options = {
            center: new kakao.maps.LatLng(
                37.624915253753194,
                127.15122688059974,
            ),
            level: 5,
        };
        const map = new kakao.maps.Map(container, options);

        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            console.log(message);
            var resultDiv = document.getElementById('clickLatlng');
            //resultDiv.innerHTML = message;
        });

        /* 단일 마커 표시 */

        // //마커가 표시될 위치
        // let markerPosition = new kakao.maps.LatLng(
        //     37.62197524055062,
        //     127.16017523675508
        // );

        // //마커 생성
        // let marker = new kakao.maps.Marker({
        //     position : markerPosition,
        // });
        // //마커를 지도위에 표시
        // marker.setMap(map);
    };

    return <div id="map" style={{ width: '100%', height: '560px' }}></div>;
}
