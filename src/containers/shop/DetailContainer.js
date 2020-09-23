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

const DetailContainer = ({ item_id }) => {
    const history = useHistory();
    const [other_menu_list, setOtherMenuList] = useState([]);
    const getCart = () => {
        history.push(Paths.ajoonamu.cart);
    };

    const [
        item_options,
        // setOptions
    ] = useState([
        { option_id: 1, option_name: '딸기 추가', option_price: '2200' },
        { option_id: 2, option_name: '토마토 추가', option_price: '2200' },
    ]);

    const onClickOptionItem = useCallback((id) => {
        console.log(id);
    }, []);
    const getOtherUserMenuApi = useCallback(async () => {
        const res = await getOtherUserMenu();
        console.log(res);
        setOtherMenuList(res);
    }, []);

    useEffect(() => {
        getOtherUserMenuApi();
    }, [getOtherUserMenuApi]);

    return (
        <div className={styles['container']}>
            <div className={styles['menu-info']}>
                <div className={styles['menu-view']}>
                    <img src={CartMenuImg} alt={'메뉴'} />
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['item-name']}>과일도시락</div>
                    <div className={styles['item-text']}>
                        여러가지 과일로 알찬 구성 도시락 입니다!
                    </div>
                    <div className={styles['item-price']}>3,000원</div>
                    <div className={styles['option-text']}>추가선택</div>
                    <div className={styles['item-additional-list']}>
                        <AdditionalList
                            itemList={item_options}
                            onClickAddItem={onClickOptionItem}
                        />
                    </div>

                    <div className={styles['box']}>
                        <div className={styles['counter']}>
                            <div className={styles['value']}>10</div>
                            <div className={styles['control']}>
                                <ButtonBase className={styles['increment']}>
                                    <Count plus={true} />
                                </ButtonBase>
                                <ButtonBase className={styles['decrement']}>
                                    <Count plue={false} />
                                </ButtonBase>
                            </div>
                        </div>
                        <div className={styles['btn']}>
                            <ButtonBase
                                toggle={true}
                                onClick={getCart}
                            >{'10개 담기(3,000원)'}</ButtonBase>
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
                        <OtherUserMenuItemList menu_list={other_menu_list} />
                    )}
                </div>
                <div className={styles['detail-info']}>
                    <TabMenu
                        tabs={[{ name: '상세정보' }, { name: '영양성분표' }]}
                        index={0}
                    />
                    <div className={styles['detail-img']}>
                        <img src={DetailImg} alt="상세 이미지" />
                    </div>
                    <div className={styles['detail-text']}>
                        <div className={styles['title']}>과일도시락</div>
                        <div className={styles['sub-title']}>
                            여러가지 과일로 알찬 구성 도시락 입니다!
                        </div>
                        <div className={styles['explan']}>
                            제철 과일은 종류에 따라 당도가 높고, 가장 맛있는
                            맛을 내기 때문에 알맞은 때에 먹어주는 것이 좋습니다.
                            <br />
                            (쿠키 추가 가능 개당 1천 원) (불고기 샌드위치,
                            크랜베리 허니에그 샌드위치 변경가능 - 변경 시 단가
                            변동)
                        </div>
                    </div>
                    <TabMenu
                        tabs={[{ name: '상세정보' }, { name: '영양성분표' }]}
                        index={1}
                    />
                    <div className={styles['detail-view']}>
                        <div className={styles['table']}>
                            <Cell tr={'중량(g)'} td={'100'} />
                            <Cell tr={'열량(kcal)'} td={'345'} />
                            <Cell tr={'당류(g)'} td={'7'} />
                            <Cell tr={'단백질(g)'} td={'20'} />
                            <Cell tr={'포화지방(g)'} td={'5'} />
                            <Cell tr={'나트륨(mg)'} td={'790'} />
                        </div>
                    </div>
                </div>
            </div>
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
