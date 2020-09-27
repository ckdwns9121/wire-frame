import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import styles from './FAQ.module.scss';

import Message from '../../components/message/Message';

import DownArrow from '../svg/support/down.svg';
import { requestFAQList } from '../../api/support/faq';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../paths';
import { dateToYYYYMMDD } from '../../lib/formatter';
import { ButtonBase } from '@material-ui/core';
import Loading from '../assets/Loading';

const cn = classnames.bind(styles);

const faq_list = [
    { id: 0, value: '회원가입' },
    { id: 1, value: '쿠폰' },
    { id: 2, value: '결제' },
    { id: 3, value: '포인트' },
    { id: 4, value: '배달' },
    { id: 5, value: '문구 서비스' },
];

export default () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [quesCategory, setQuesCategory] = useState(0);
    const [selectOpen, setSelectOpen] = useState(false);
    const [list, setList] = useState([]);

    const [openIndex, setOpenIndex] = useState(-1);

    const handelSelectToggle = useCallback(() => setSelectOpen(!selectOpen), [
        selectOpen,
    ]);
    const onChangeCategory = useCallback((cate) => {
        setQuesCategory(cate);
    }, []);

    const handleChange = useCallback((index) => {
        if (openIndex !== index ) {
            setOpenIndex(index);
        } else {
            setOpenIndex(-1);
        }
    }, [openIndex]);

    const getFAQList = useCallback(async () => {
        setLoading(true);
        try {
            console.log(quesCategory);
            const res = await requestFAQList(quesCategory);
            setList(res);
        } catch (e) {
            alert('잘못된 접근입니다.');
            history.push(Paths.ajoonamu.signin);
        }
        setLoading(false);
    }, [quesCategory, history]);

    useEffect(() => {
        getFAQList();
    }, [getFAQList]);

    return (
        <div className={styles['box']}>
            <div className={styles['select']}>
                <p className={styles['q-title']}>궁금하신 질문의 유형을 선택해주세요.</p>
                <div className={styles['select-box']} onClick={handelSelectToggle}>
                    <img className={styles['opener']} src={DownArrow} alt="더보기" />
                    <div className={styles['current']}>{faq_list[quesCategory].value}</div>
                    <div className={cn('embed', { open: selectOpen })}>
                        {faq_list.map((item) => item.id !== quesCategory
                            &&(<div key={item.id} className={styles['s-area']}
                                    onClick={() => onChangeCategory(item.id)}>
                                    <div className={cn('selector')}>
                                        {item.value}
                                    </div>
                                </div>))}
                    </div>
                </div>
            </div> 
            {loading ? <Loading open={loading} />
            : <div className={styles['table']}>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={item.id} className={cn('column', { open: openIndex === index })}>
                            <ButtonBase onClick={() => handleChange(index)} className={styles['row']}>
                                <div className={styles['question']}>{item.question}</div>
                                <div className={styles['created']}>{dateToYYYYMMDD(item.created_at, '/')}</div>
                                <div className={styles['opener']}><img className={styles['direct']} src={DownArrow} alt="더보기" /></div>
                            </ButtonBase>
                            <div className={styles['answer']} dangerouslySetInnerHTML={{ __html: item.answer}} />
                        </div>
                    )) 
                ) : (<Message src={false} msg={'등록된 자주 묻는 질문이 없습니다.'} size={260} />)}
            </div>}
        </div>
    );
};