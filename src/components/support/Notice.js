import React, { useCallback, useEffect, useState } from 'react';
import styles from './Notice.module.scss';

import Message from '../message/Message';
import { requestNoticeList } from '../../api/support/notice';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';
import { dateToYYYYMMDD } from '../../lib/formatter';

export default () => {
    const [list, setList] = useState([]);
    const history = useHistory();

    const getNoticeList = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        try {
            const res = await requestNoticeList(token);
            setList(res.notices);
        } catch (e) {
            alert('잘못된 접근입니다.');
            history.replace(Paths.index);
        }
    }, [history]);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]); 

    return (
        <div className={styles['box']}>
            <div className={styles['table']}>
                {list.length > 0 ?
                list.map(item => (
                    <div key={item.id} className={styles['column']}>
                        <div className={styles['row']}>
                            <div className={styles['id']}>
                                {item.id}
                            </div>
                            <div className={styles['title']}>
                                {item.title}
                            </div>
                            <div className={styles['created']}>
                                {dateToYYYYMMDD(item.created_at)}
                            </div>
                        </div>
                    </div>)
                ) : <Message src={false} msg={"등록된 공지사항이 없습니다."} size={260} />}
            </div>
        </div>
    );
};