import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import styles from './EventContainer.module.scss';

import defaultImage from '../../components/svg/event/event_test.png';

import { Paths } from '../../paths';
import { requestEventList, requestEventShow } from '../../api/event/event';
import Message from '../../components/message/Message';
import { dateToYYYYMMDD } from '../../lib/formatter';
import { ButtonBase } from '@material-ui/core';

const cn = classnames.bind(styles);

const offset = 0, limit = 30;

export default ({ match, location }) => {
    const history = useHistory();

    const [list, setList] = useState([]);
    const [item, setItem] = useState({});
    const [mode] = useState(0);

    const detail = match.params.id !== undefined;

    const getEventList = useCallback(async () => {
        const res = await requestEventList(offset, limit);
        setList(res.events);
    }, []);
    const getEventShow = useCallback(async () => {
        const res = await requestEventShow(match.params.id);
        setItem(res.event);
    }, [match]);

    const onClickDetail = useCallback(
        (id) => {
            history.push(`${Paths.ajoonamu.event}/${id}`);
        },
        [history],
    );

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    useEffect(() => {
        if (detail) {
            getEventShow();
        }
    }, [detail, getEventShow]);

    console.log(match, location);

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
                    >
                        종료된 이벤트
                    </span>
                </div>
            </div>
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
                            {item.images === '[]' && (
                                <img src={defaultImage} alt="기본 이미지" />
                            )}
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
                                    {images === '[]' && (
                                        <img
                                            src={defaultImage}
                                            alt="기본 이미지"
                                        />
                                    )}
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
        </div>
    );
};
