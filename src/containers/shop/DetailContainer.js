import React, { useCallback, useEffect, useState } from 'react';
import { Paths } from 'paths';
import styles from './Detail.module.scss';
import AdditionalList from 'components/item/AdditionalList';
import { useHistory } from 'react-router';
import OtherUserMenuItemList from 'components/item/OtherUserMenuItemList';
import { getOtherUserMenu } from '../../api/menu/menu';
import TabMenu from '../../components/tab/TabMenu';
import Count from '../../components/svg/counter/Count';
import CartMenuImg from '../../components/svg/cart/cart_menu.png';
import DetailImg from '../../components/svg/cart/detail_img.png';
import { ButtonBase } from '@material-ui/core';
import { useStore } from '../../hooks/useStore';
import Loading from '../../components/assets/Loading';
import { numberFormat } from '../../lib/formatter';
import { addCartItem } from '../../api/cart/cart';

import { getMenuInfo } from '../../api/menu/menu';

const DetailContainer = ({ item_id }) => {
    const history = useHistory();
    const user_token = useStore();
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [quanity, setQuanity] = useState(1);
    const [options, setOptions] = useState(null);
    const [option_total, setOptionTotal] = useState(0);

    const [other_menu_list, setOtherMenuList] = useState([]);

    //임의로 넣어준 다른사람이 본 메뉴
    const getOtherUserMenuApi = useCallback(async () => {
        const res = await getOtherUserMenu();
        console.log(res);
        setOtherMenuList(res);
    }, []);
    const onClickCart = useCallback(async () => {
        setLoading(true);
        setSuccess(false);
        if (user_token) {
            const res = await addCartItem(
                user_token,
                item_id,
                options,
                quanity,
            );
            console.log(res);
            setSuccess(true);
        }
        setLoading(false);
        history.push(Paths.ajoonamu.cart);
    }, [history, item_id, options, quanity, user_token]);

    const setOptionItem = useCallback(() => {
        const add_option = menu.options
            .filter((option) => option.check)
            .map((option) => option.option_id);
        setOptions(add_option);
    }, [menu]);

    const onDecrement = useCallback(() => {
        if (quanity > 1) setQuanity(quanity - 1);
    }, [quanity]);

    const onIncrement = useCallback(() => {
        setQuanity(quanity + 1);
    }, [quanity]);

    const getMenu = useCallback(async () => {
        setLoading(true);

        if (user_token) {
            const res = await getMenuInfo(user_token, item_id);
            setMenu(res);
            setSuccess(true);
        } else setError(true);
        setLoading(false);
    }, [item_id, user_token]);

    const onClickOptionItem = (id) => {
        const newOptionItem = menu.options.map((item) => {
            if (item.option_id === id) {
                item.check = !item.check;
                let option_price = item.option_price;
                let new_total = option_total;
                new_total += item.check ? option_price : option_price * -1;
                setOptionTotal(new_total);
            }
            return item;
        });
        setMenu({ ...menu }, { options: newOptionItem });
    };

    useEffect(() => {
        getOtherUserMenuApi();
        getMenu();
    }, [getMenu, getOtherUserMenuApi]);

    useEffect(() => {
        menu && setOptionItem();
    }, [menu, setOptionItem]);

    return (
        <div className={styles['min-height']}>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    {success && !error && (
                        <div className={styles['container']}>
                            <div className={styles['menu-info']}>
                                <div className={styles['menu-view']}>
                                    <img src={CartMenuImg} alt={'메뉴'} />
                                </div>
                                <div className={styles['item-info']}>
                                    <div className={styles['item-name']}>
                                        {menu.item.item_name}
                                    </div>
                                    <div className={styles['item-text']}>
                                        {menu.item.item_sub}
                                    </div>
                                    <div className={styles['item-price']}>
                                        {numberFormat(menu.item.item_price)}원
                                    </div>
                                    <div className={styles['option-text']}>
                                        추가선택
                                    </div>
                                    <div
                                        className={
                                            styles['item-additional-list']
                                        }
                                    >
                                        <AdditionalList
                                            itemList={menu.options}
                                            onClickAddItem={onClickOptionItem}
                                        />
                                    </div>

                                    <div className={styles['box']}>
                                        <div className={styles['counter']}>
                                            <div className={styles['value']}>
                                                {quanity}
                                            </div>
                                            <div className={styles['control']}>
                                                <ButtonBase
                                                    className={
                                                        styles['increment']
                                                    }
                                                    onClick={onIncrement}
                                                >
                                                    <Count plus={true} />
                                                </ButtonBase>
                                                <ButtonBase
                                                    className={
                                                        styles['decrement']
                                                    }
                                                    onClick={onDecrement}
                                                >
                                                    <Count plue={false} />
                                                </ButtonBase>
                                            </div>
                                        </div>
                                        <div className={styles['btn']}>
                                            <ButtonBase onClick={onClickCart}>
                                                {`${quanity}개 담기(${numberFormat( menu.item.item_price *quanity +option_total,)}원)`}
                                            </ButtonBase>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['content']}>
                                <div className={styles['title']}>
                                    다른 고객들이 함께 본 상품
                                </div>
                                <div className={styles['other-menu-list']}>
                                    {other_menu_list.length !== 0 && (
                                        <OtherUserMenuItemList
                                            menu_list={other_menu_list}
                                        />
                                    )}
                                </div>
                                <div className={styles['detail-info']}>
                                    <TabMenu
                                        tabs={[
                                            { name: '상세정보' },
                                            { name: '영양성분표' },
                                        ]}
                                        index={0}
                                    />
                                    <div className={styles['detail-img']}>
                                        <img
                                            src={DetailImg}
                                            alt="상세 이미지"
                                        />
                                    </div>
                                    <div className={styles['detail-text']}>
                                        <div className={styles['title']}>
                                            과일도시락
                                        </div>
                                        <div className={styles['sub-title']}>
                                            여러가지 과일로 알찬 구성 도시락
                                            입니다!
                                        </div>
                                        <div className={styles['explan']}>
                                            제철 과일은 종류에 따라 당도가 높고,
                                            가장 맛있는 맛을 내기 때문에 알맞은
                                            때에 먹어주는 것이 좋습니다.
                                            <br />
                                            (쿠키 추가 가능 개당 1천 원) (불고기
                                            샌드위치, 크랜베리 허니에그 샌드위치
                                            변경가능 - 변경 시 단가 변동)
                                        </div>
                                    </div>
                                    <TabMenu
                                        tabs={[
                                            { name: '상세정보' },
                                            { name: '영양성분표' },
                                        ]}
                                        index={1}
                                    />
                                    <div className={styles['detail-view']}>
                                        <div className={styles['table']}>
                                            <Cell tr={'중량(g)'} td={'100'} />
                                            <Cell
                                                tr={'열량(kcal)'}
                                                td={'345'}
                                            />
                                            <Cell tr={'당류(g)'} td={'7'} />
                                            <Cell tr={'단백질(g)'} td={'20'} />
                                            <Cell tr={'포화지방(g)'} td={'5'} />
                                            <Cell
                                                tr={'나트륨(mg)'}
                                                td={'790'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

function Cell({ tr, td }) {
    return (
        <div className={styles['cell']}>
            <div className={styles['tr']}>{tr}</div>
            <div className={styles['td']}>{td}</div>
        </div>
    );
}

export default DetailContainer;
