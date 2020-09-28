import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import qs from 'querystring';
import { useHistory } from 'react-router-dom';
import styles from './EventContainer.module.scss';

import defaultImage from '../../components/svg/event/event_test.png';

import { Paths } from '../../paths';
import { requestEventList, requestEventShow } from '../../api/event/event';
import Message from '../../components/assets/Message';
import { dateToYYYYMMDD, DBImageFormat } from '../../lib/formatter';
import { ButtonBase } from '@material-ui/core';
import { useModal } from '../../hooks/useModal';
import Loading from '../../components/assets/Loading';
import ListPaging from '../../components/sidebar/ListPaging';
import DetailPaging from '../../components/sidebar/DetailPaging';

const cn = classnames.bind(styles);


const PAGE_PER_VIEW = 5;

const URL = 'http://devapi.ajoonamu.com/storage/';

export default ({ match, location }) => {
    const search = location.search.replace('?', '');
    const query = qs.parse(search);

    const page = query.page ? parseInt(query.page) : 1;

    const history = useHistory();
    const openModal = useModal();

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [item, setItem] = useState({
        images: ''
    });
    const [mode] = useState(0);

    const detail = match.params.id !== undefined;

    const getEventList = useCallback(async () => {
        setLoading(true);
        try {
            const res = await requestEventList(PAGE_PER_VIEW, (page - 1) * PAGE_PER_VIEW);
            if (count !== res.count) {
                setCount(res.count);
            }
            setList(res.events);
        } catch (e) {
            openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
        }
        setLoading(false);
    }, [openModal, page, count]);

    const getEventShow = useCallback(async () => {
        setLoading(true);
        try {
            const res = await requestEventShow(match.params.id);
            if (res.event) {
                setItem(res.event);
            } else {
                openModal('지워지거나 없는 게시물입니다.', '다시 시도 해주세요.');    
                history.push(Paths.index);
            }
        } catch (e) {
            openModal('잘못된 접근입니다.', '잠시 후 재시도 해주세요.');
        }
        setLoading(false);
    }, [match, openModal, history]);

    const onClickDetail = useCallback(id =>
        history.push(`${Paths.ajoonamu.event}/${id}`), [history]);

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    useEffect(() => {
        if (detail) {
            getEventShow();
        }
    }, [detail, getEventShow]);

    return (
        <div className={styles['container']}>
            <div className={styles['title-area']}>
                <h2 className={styles['title']}>이벤트</h2>
                <div className={styles['mini-nav']}>
                    <span className={cn('mnav-item', { active: mode === 0 })}>
                        진행 중인 이벤트
                    </span>
                    <span
                        onClick={() => alert('종료된 이벤트가 없습니다!')}
                        className={cn('mnav-item', { active: mode === 1 })}
                    >종료된 이벤트</span>
                </div>
            </div>
            {loading ? <Loading open={loading} />
            :
            <>
                <div className={styles['content']}>
                    {detail ? (
                        <>
                            <div className={styles['c-title-area']}>
                                <h3 className={styles['c-title']}>{item.warn}</h3>
                                <p className={styles['c-enddate']}>
                                    {dateToYYYYMMDD(item.end_date, '/')}까지
                                </p>
                            </div>
                            <div className={styles['e-content']}>
                                {item && item.images === '[]' ? <img src={defaultImage} alt="기본 이미지" />
                                : <img src={URL + DBImageFormat(item.images)} alt="이벤트 이미지" />}
                            </div>
                        </>
                    ) : list.length > 0 ? (
                        list.map(({ id, images, warn, end_date }) => {
                            return (
                                <ButtonBase
                                    onClick={() => onClickDetail(id)}
                                    key={id}
                                    className={styles['item']}
                                >
                                    <div className={styles['image']}>
                                        {images === '[]' ? <img src={defaultImage} alt="기본 이미지"/>
                                        : <img src={URL + DBImageFormat(images)} alt="이벤트 이미지" />}
                                    </div>
                                    <div className={styles['text']}>
                                        <p className={styles['warn']}>{warn}</p>
                                        <p className={styles['enddate']}>
                                            {dateToYYYYMMDD(end_date, '/')}까지
                                        </p>
                                    </div>
                                </ButtonBase>
                            );
                        })
                    ) : (
                        <Message src={false} msg={'조회 결과가 없습니다 '} size={260} />
                    )}
                </div>
                {detail ? <DetailPaging baseURL={Paths.ajoonamu.event} />
                : <ListPaging baseURL={Paths.ajoonamu.event} pagePerView={PAGE_PER_VIEW} currentPage={page} totalCount={count} />}
            </>}
        </div>
    );
};
