import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { requestQNAList, requestQNAStore } from '../../api/support/qna';
import { Paths } from '../../paths';

import Message from '../message/Message';

import styles from './QNA.module.scss';
import { ButtonBase } from '@material-ui/core';

const cn = classnames.bind(styles);

export default ({ match, location }) => {
    const [list, setList] = useState([]);
    const history = useHistory();

    console.log(match, location)


    const writeMode = match.params.id === 'write';
    const pages = match.params.id;

    const getNoticeList = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await requestQNAList(token);
            setList(res.qnas);
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
            <ButtonBase
                className={styles['qna-button']}
                onClick={() =>
                    history.push(`${Paths.ajoonamu.support}/qna/write`)
                }
            >
                문의하기
            </ButtonBase>
            {writeMode ? <QNAWrite /> : <QNATable list={list} />}
            
        </div>
    );
};

const QNATable = ({ list }) => (
    <div className={styles['table']}>
        {list.length > 0 ? (
            list.map((item) => (
                <div className={styles['column']}>
                    <div className={styles['row']}></div>
                </div>
            ))
        ) : (
            <Message msg={'등록된 문의내역이 없습니다.'} size={260} />
        )}
    </div>
);
const QNAWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);

    const onChangeTitle = useCallback(e => setTitle(e.target.value), [])
    const onChangeContent = useCallback(e => setContent(e.target.value), [])
    const onChangeFiles = useCallback(e => {
        console.log(e.target.files);
        setFiles(e.target.files[0]);
    }, []);

    const sendQNAStore = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const res = await requestQNAStore(token, {
                title, content, files
            });
        } else {
            alert('로그인 후 이용 가능합니다.');
        }
    }, [title, content, files]);

    return (
        <>
            <div className={styles['table']}>
                <div className={cn('input-area')}>
                    <div className={styles['area-name']}>문의 제목</div>
                    <div className={styles['content']}>
                        <input className={styles['q-title']} type="text" value={title} onChange={onChangeTitle} />
                    </div>
                </div>
                <div className={cn('input-area', 'v-top')}>
                    <div className={styles['area-name']}>문의 내용</div>
                    <div className={styles['content']}>
                        <textarea className={styles['q-content']} value={content} onChange={onChangeContent} />
                    </div>
                </div>
                <div className={cn('input-area')}>
                    <div className={styles['area-name']}>첨부 사진</div>
                    <div className={styles['content']}>

                        <input className={styles['q-files']} type="file" onChange={onChangeFiles} />
                    </div>
                </div>
            </div>
            <div className={styles['button-area']}>
                <ButtonBase onClick={sendQNAStore} className={styles['confirm']}>
                    등록
                </ButtonBase>
            </div>
        </>
    )
}
const QNADetail = () => {

    return (
        <div className={styles['table']}>

        </div>
    );
};