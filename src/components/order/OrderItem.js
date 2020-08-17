import React from 'react';
import styles from './Order.module.scss';


const OrderItem = () => {
    return (
        <div className={styles['order-item']}>
            <div className={styles['pd-box']}>
                <div className={styles['order-sub']}>
                    <div className={styles['bar']}>
                        <OrderNumber order_number={"54545475741"} />
                        <OrderDate order_date={"2020-06-01 13:30:10"} />
                        <OrderTime order_time={"2020-06-02 09:30:00"} />
                    </div>
                    <div className={styles['result']}>
                        배달완료
                </div>
                </div>
                <div className={styles['order-info']}>
                    <div className={styles['info']}>
                        <OrderMenu />
                        <OrderMenu />
                        <OrderMenu />
                    </div>
                    <div className={styles['cost']}>
                        <div className={styles['delivery-cost']}>
                            배달비 3000원
                        </div>
                        <div className={styles['total-cost']}>
                            총 수량 20개<br/>
                            총 주문금액 3000원<br></br>
                            asd
                       </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

function OrderNumber({ order_number }) {
    return (
        <div className={styles['info']}>
            주문번호: {order_number}
        </div>
    )
}

function OrderDate({ order_date }) {
    return (
        <div className={styles['info']}>
            주문일시: {order_date}
        </div>
    )
}
function OrderTime({ order_time }) {
    return (
        <div className={styles['info']}>
            배달 요청 시간 :  {order_time}
        </div>
    )
}
function OrderMenu({ order_item, options }) {
    return (
        <div className={styles['order-menu']}>
            <div className={styles['menu-name']}>
                떡볶이 10개 (10000원)
            </div>
            <div className={styles['menu-options']}>
                추가선택: 없음
            </div>
        </div>
    )
}
function DeliveryCost({ cost }) {
    return (
        <div className={styles['cost']}>
            배달비 {cost}
        </div>
    )
}
export default OrderItem;