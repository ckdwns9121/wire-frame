import React,{useState,useEffect,useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OrderList.module.scss';
import { Paths } from 'paths';
import PreviewOrderItem from '../../components/order/PreviewOrderItem';
import { ButtonBase } from '@material-ui/core';
import Message from 'components/message/Message';
import Loading from '../../components/assets/Loading';
import {getOrderList} from '../../api/order/orderItem';
import {useStore} from '../../hooks/useStore';
import PreviewOrderList from '../../components/order/PreviewOrderItemList';

//주문내역 페이지
const OrderListContainer = () => {

    const user_token = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [order_list,setOrderList] = useState([]);

    const callOrderListApi =async()=>{
        setLoading(true);
        if(user_token){
            const res= await getOrderList(user_token);
            console.log(res);
            setOrderList(res);
        }
        setLoading(false);
    }

    const onClickOrderItem = useCallback((order_id)=>{
        console.log(order_id);
        history.push(`${Paths.ajoonamu.mypage}/order_detail?order_id=${order_id}`);
    },[history]);


    useEffect(()=>{
        callOrderListApi();
    },[])

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['title']}>주문내역</div>
            </div>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    <div className={styles['select-date']}>
                        <div className={styles['date']}>
                            <ButtonBase className={styles['date-box']}>
                                1주일
                            </ButtonBase>
                            <ButtonBase className={styles['date-box']}>
                                1개월
                            </ButtonBase>
                            <ButtonBase className={styles['date-box']}>
                                3개월
                            </ButtonBase>
                            <ButtonBase className={styles['date-box']}>
                                6개월
                            </ButtonBase>
                        </div>
                        <div className={styles['date-input-box']}>
                            <div className={styles['text']}>기간 입력</div>
                            <div className={styles['input']}>
                                <input />
                            </div>
                            <div className={styles['line']} />
                            <div className={styles['input']}>
                                <input />
                            </div>
                            <ButtonBase className={styles['btn']}>
                                조회
                            </ButtonBase>
                        </div>
                    </div>
                    <div className={styles['order-list']}>
                        {order_list.length!==0 ? 
                           <PreviewOrderList order_list={order_list} onClick={onClickOrderItem}/> :
                           <Message 
                            msg={"주문 내역이 존재하지 않습니다."}
                            isButton={true}
                            buttonName={"주문하러 가기"}
                            onClick={()=>history.push(`${Paths.ajoonamu.shop}?tab=0`)}
                            />
                         }
                    </div>
                </>
            )}
        </div>
    );
};
export default OrderListContainer;
