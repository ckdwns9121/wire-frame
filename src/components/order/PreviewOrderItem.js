import React from 'react';
import styles from './Preview.module.scss';
import Noimage from '../svg/noimage.png';
import Arrow from '../svg/arrow/Arrow';
import { DBImageFormat, numberFormat } from "../../lib/formatter";
import { ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';
import ErrorCoverImage from '../assets/ErrorCoverImage';

const PreviewOrderItem = (props) => {
    const {
        // cp_price,
        items,
        info,
        order_id,
        // point_price,
        receipt_time,
        // receipt_price,
        review_id,
        // send_cost,
        // total_price,
    } = props;
    const history = useHistory();


    return (
        <div className={styles['preview-item']}>
            <div className={styles['preview-title-bar']}>
                <div className={styles['order-info']}>
                    <div className={styles['top']}>
                        <div className={styles['order-date']}>
                            {receipt_time ? receipt_time.replace(/-/g, '/')
                            : "주문 시간이 없습니다."}
                        </div>
                        <div className={styles['order-id']}>
                            주문번호 : {order_id}
                        </div>
                        <div className={styles['order-type']}>
                            {info[0].od_status === "order_cancel" && '주문취소'}
                            {info[0].od_status === "order_apply" && '배달완료'}
                            {!info[0].od_status && "상태없음"}
                        </div>
                        <ButtonBase className={styles['review-button']}
                            onClick={() => history.push(
                                Paths.ajoonamu.mypage + '/order_review?' + (review_id === null ? 'order_id=' + order_id : 'review_id=' + review_id)
                            )}
                        >
                            {review_id === null ? '리뷰작성' : '리뷰수정'}
                        </ButtonBase>
                    </div>
                    <div className={styles['bottom']}>
                        <div className={styles['req-date']}>
                            배달 요청 시간 : {info[0].delivery_req_time ? info[0].delivery_req_time : '요청하신 시간이 없습니다.'}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['menu-list']}>
                <MenuList info={info} items={items}/>
            </div>
            <div className={styles['href-detail']} onClick={props.onClick}>
                <div className={styles['text']}>주문 상세보기</div>
                <div className={styles['icon']}>
                    <Arrow />
                </div>
            </div>
        </div>
    );
};

function MenuList({ items, info }) {
    const list = items.map((item, index) => (
        <MenuItem
            key={index}
            item_name={item.item_name}
            item_option={item.item_option}
            item_price={item.item_price}
            qty={info[index].qty}
            src={item.item_img}
        />
    ));
    return (
        <> {list}</>
    )
};

function MenuItem({ src, item_name, item_option, item_price, qty }) {
    return (
        <div className={styles['menu-item']}>
            <div className={styles['menu-img']}>
                <ErrorCoverImage src={( src !== undefined && src !== "[]") ? DBImageFormat(src)[0] : Noimage} alt="메뉴" />
            </div>
            <div className={styles['menu-name']}>{item_name}</div>
            <div className={styles['menu-price']}>
                {qty}개 ({numberFormat(item_price * qty)}원)
            </div>
            <div className={styles['menu-options']}>(추가선택: {item_option ? item_option : '없음'})</div>
        </div>
    );
}
export default PreviewOrderItem;
