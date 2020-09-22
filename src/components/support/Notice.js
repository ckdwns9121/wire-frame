import React, { useCallback, useEffect, useState } from 'react';
import styles from './Notice.module.scss';

import Message from '../message/Message';
import { requestNoticeList } from '../../api/support/notice';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';

export default () => {

    const [list, setList] = useState([]);
    const history = useHistory();

    const getNoticeList = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await requestNoticeList(token);
            setList(res.notices);
        } else {
            alert('로그인 후 이용해 주시기 바랍니다.');
            history.push(Paths.ajoonamu.signin);
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
                    <div className={styles['column']}>
                        <div className={styles['row']}>

                        </div>
                    </div>)
                ) : <Message msg={"등록된 공지사항이 없습니다."} size={260} />}
            </div>
        </div>
    );
};