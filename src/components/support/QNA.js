import React, { useCallback, useEffect, useState } from 'react';
import qs from 'querystring';
import classnames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { requestQNADelete, requestQNADetail, requestQNAList, requestQNAStore } from '../../api/support/qna';
import { Paths } from '../../paths';

import Message from '../assets/Message';

import styles from './QNA.module.scss';
import { ButtonBase, IconButton } from '@material-ui/core';
import { dateToYYYYMMDD } from '../../lib/formatter';
import Delete from '../svg/support/Delete';
import { useStore } from '../../hooks/useStore';
import { useModal } from '../../hooks/useModal';
import Loading from '../assets/Loading';

const cn = classnames.bind(styles);

export default ({ match, location }) => {
    const token = useStore();
    const openModal = useModal();
    const [loading, setLoading] = useState(false);

    const [list, setList] = useState([]);
    const history = useHistory();

    const writeMode = match.params.id === 'write';
    const viewMode = match.params.id === 'view';

    const search = location.search.replace('?', '');
    const query = qs.parse(search);

    const getQNAList = useCallback(async () => {
        setLoading(true);
        if (token) {
            try {
                const res = await requestQNAList(token);
                console.log(res.qnas);
                setList(res.qnas);
            } catch (e) {
                openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
                history.replace(Paths.index);
            }
        }
        setLoading(false);
    }, [history, openModal, token]);

    const onRemoveList = useCallback(id => setList(list => list.filter(item => item.id !== id)), []);

    const handleClickDetail = useCallback(id => {
        history.push(`${Paths.ajoonamu.support}/qna/view?id=${id}`)
    }, [history])

    useEffect(() => {
        getQNAList();
    }, [getQNAList]);

    return (
        <>
            {loading ? <Loading open={loading} /> :
            <div className={styles['box']}>
                {!writeMode && !viewMode && <ButtonBase
                    className={styles['qna-button']}
                    onClick={() => history.push(`${Paths.ajoonamu.support}/qna/write`)}
                >
                    문의하기
                </ButtonBase>}
                {writeMode ? <QNAWrite token={token} />
                    : viewMode ? <QNADetail token={token} id={query.id} onRemove={onRemoveList} />
                        : <QNATable list={list} handleClick={handleClickDetail} />}
                
            </div>}
        </>
    );
};

const QNATable = ({ list, handleClick }) => (
    <div className={styles['table']}>
        {list.length > 0 ? (
            list.map(({ id, subject, status, q_datetime }) => (
                <ButtonBase key={id} className={styles['column']}
                    onClick={() => handleClick(id)}>
                    <div className={styles['row']}>
                        <QNAState status={status} />
                        <div className={styles['subject']}>{subject}</div>
                        <div className={styles['datetime']}>
                            {dateToYYYYMMDD(q_datetime, '/')}
                        </div>
                    </div>
                </ButtonBase>
            ))
        ) : (
            <Message src={false} msg={'등록된 문의내역이 없습니다.'} size={260} />
        )}
    </div>
);
const QNAWrite = ({ token }) => {
    const openModal = useModal();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const history = useHistory();

    const onChangeTitle = useCallback(e => setTitle(e.target.value), [])
    const onChangeContent = useCallback(e => setContent(e.target.value), [])
    const onChangeFiles = useCallback(e => {
        const { files: f } = e.target;
        const fileArray = [];
        for (let i = 0; i < f.length; i++) {
            fileArray.push(f[i]);
        }
        setFiles(fileArray);
    }, []);

    const onDeleteFile = useCallback(name => setFiles(files => files.filter(file => file.name !== name)), []);

    const sendQNAStore = useCallback(async () => {
        if (token) {
            try {
                const res = await requestQNAStore(token, {
                    title,
                    content,
                    files,
                });
                if (res.data.msg === "성공") {
                    openModal('성공적으로 작성하였습니다!', '답변이 올 때까지는 조금 시간이 소요됩니다.');
                    history.replace(`${Paths.ajoonamu.support}/qna`);
                } else {
                    openModal('작성하는 도중 오류가 발생했습니다!', '다시 시도해 주세요.');
                }
            } catch (e) {
                openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
                history.replace(Paths.index);
            }
        }
    }, [token, title, content, files, openModal, history]);

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
                        <div className={styles['file']}>
                            <div className={styles['unknown-area']}></div>
                            <div style={{ display: 'table-cell', textAlign: 'right' }}>
                                <input className={styles['q-files']} multiple="multiple" type="file" onChange={onChangeFiles} id="file-setter" accept="image/gif, image/jpeg, image/png, image/svg" />
                                <ButtonBase className={styles['file-finder']}>
                                    <label htmlFor="file-setter">
                                        찾아보기
                                    </label> 
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['file-list']}>
                    {files.map(file => (
                        <div className={styles['file-item']} key={file.name}>
                            {file.name}
                            <IconButton className={styles['delete']} onClick={() => onDeleteFile(file.name)}>
                                <Delete/>
                            </IconButton>
                        </div>
                    ))}
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
const QNADetail = ({ id, token, onRemove }) => {
    const openModal = useModal();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const deleteQNA = useCallback(async () => {
        if (token) {
            setLoading(true);
            try {
                const res = await requestQNADelete(token, id);
                if (res.data.msg === '성공') {
                    openModal('게시글을 삭제하였습니다!', '');
                    onRemove(parseInt(id));
                    history.replace(Paths.ajoonamu.support + '/qna');
                } else {
                    openModal('삭제를 실패했습니다.', '다시 시도해주세요.');
                }
            } catch (e) {
                openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
                history.push(Paths.index);
            }
            setLoading(false);
        } else {
            openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
            history.push(Paths.index);
        }
    }, [history, id, onRemove, openModal, token]);

    const getQNADetail = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            setLoading(true);
            try  {
                const res = await requestQNADetail(token, id);
                if (res.data.query !== null) {
                    setData(res.data.query);
                } else {
                    openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
                    history.push(Paths.index);
                }
            } catch (e) {
                openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
                history.push(Paths.index);
            }
            setLoading(false);
        } else {
            openModal('잘못된 접근입니다', '정상적으로 다시 접근해 주세요.');
            history.push(Paths.index);
        }
    }, [history, id, openModal])

    useEffect(() => {
        getQNADetail();
        return () => {

        }
    }, [getQNADetail]);

    const { status, subject, q_datetime, a_datetime, question, answer } = data;

    return (
        <>
            {loading ? <Loading open={loading} />
            : <>
                <div style={{ marginBottom: '0' }} className={styles['table']}>
                    <div className={styles['column']}>
                        <div className={styles['row']}>
                            <QNAState status={status} />
                            <div className={styles['subject']}>{subject}</div>
                            <div className={styles['datetime']}>
                                {dateToYYYYMMDD(q_datetime, '/')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['question']}>
                    <div className={styles['q-content']}>{question}</div>
                    <div className={styles['interaction']}>
                        <ButtonBase className={styles['btn']}>수정</ButtonBase>
                        <ButtonBase className={styles['btn']} onClick={deleteQNA}>삭제</ButtonBase>
                    </div>
                </div>
                {status === 1 && <div className={styles['answer']}>
                    <div className={styles['info']}>
                        <span className={styles['a-name']}>답변</span>
                        <span className={styles['a-date']}>{dateToYYYYMMDD(a_datetime, '/')}</span>
                    </div>
                    <div className={styles['a-content']} dangerouslySetInnerHTML={{ __html: answer}} />
                </div>}
            </>}
        </>
    );
};

const QNAState = ({ status }) => (
    <div className={styles['state']}>
        <div className={cn('state-box', { complete: status !== 0 })}>
            {status !== 0 ? '답변완료' : '답변대기'}
        </div>
    </div>
);