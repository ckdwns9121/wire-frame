/*global kakao*/
import React, { useEffect } from 'react';
import { markerdata } from "./data";
import MarkerImg from './MarkerImg.svg';

export default function Map(props) {

    const {store_list} = props;
    console.log(props.store_list);
    useEffect(() => {
        mapScript();
    }, [store_list]);

    //127.15122688059974
    const mapScript = () => {
        let container = document.getElementById('map');
        let options = {
            center: new kakao.maps.LatLng(
                store_list.length!==0 ?  parseFloat(store_list[0].shop_lat) : 37.624915253753194,
                store_list.length!==0 ?  parseFloat(store_list[0].shop_lng) : 127.15122688059974,
            ),
            level: 5,
        };
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();


        const imageSrc = MarkerImg,
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.


        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image: markerImage

        });
        const ClickMarker = new kakao.maps.Marker({
            position: map.getCenter(),
            image: markerImage

        });


        store_list.forEach((el) => {
            // 마커를 생성합니다
            new kakao.maps.Marker({
                //마커가 표시 될 지도
                map: map,
                //마커가 표시 될 위치
                position: new kakao.maps.LatLng(parseFloat(el.shop_lat),  parseFloat(el.shop_lng)),
                //마커에 hover시 나타날 title
                title: el.shop_name,
                image: markerImage

            });
            var infowindow = new kakao.maps.InfoWindow({
                content: el.shop_name, // 인포윈도우에 표시할 내용
            });


            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다
            // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(
                marker,
                "mouseover",
                makeOverListener(map, marker, infowindow)
            );
            kakao.maps.event.addListener(
                marker,
                "mouseout",
                makeOutListener(infowindow)
            );

        });

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
            return function () {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
            return function () {
                infowindow.close();
            };
        }

        const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            ClickMarker.setPosition(latlng);

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            console.log(message);
            var resultDiv = document.getElementById('clickLatlng');


            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                    
                    var content = '<div class="bAddr">' +
                                    '<span class="title">법정동 주소정보</span>' + 
                                    detailAddr + 
                                '</div>';
        
                    // 마커를 클릭한 위치에 표시합니다 
                    ClickMarker.setPosition(mouseEvent.latLng);
                    ClickMarker.setMap(map);
                    // setJibun(result[0].address.address_name );

                    if(!!result[0].road_address){
                        // setRoad(result[0].road_address.address_name);
                    }
        
                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content);
                    // infowindow.open(map, ClickMarker);
                }   
            });
            //resultDiv.innerHTML = message;
        });

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

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

    return (<div id="map" style={{ width: '100%', height: '560px' }}></div>);
}
