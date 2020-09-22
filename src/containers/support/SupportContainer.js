import React, { useCallback, useEffect, useState } from 'react';
import styles from './SupportContainer.module.scss';
import classnames from 'classnames/bind';

import { Paths } from '../../paths';


import Sidebar from '../../components/sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Notice from '../../components/support/Notice';
import FAQ from '../../components/support/FAQ';


const cn = classnames.bind(styles);

const LinkList = [
    { name: "공지사항", url: `${Paths.ajoonamu.support}/notice` },
    { name: "자주 묻는 질문", url: `${Paths.ajoonamu.support}/faq` },
    { name: "1:1문의", url: `${Paths.ajoonamu.support}/qna` },
];

const content_titles = {
    '/notice': "공지사항",
    '/faq': "자주 묻는 질문",
    '/qna': "1:1 문의"
};


export default ({ pathname }) => {

    return (
        <div className={styles['container']}>
            <Sidebar title={"고객센터"} linkList={LinkList} active={'/support' + pathname} />
            <div className={styles['content']}>
                <h2 className={styles['title']}>{content_titles[pathname]}</h2>
                <Switch>
                    <Route path={`${Paths.ajoonamu.support}/qna`} render={() => {
                        
                        return (
                            <div className={styles['box']}>

                            </div>
                        )
                    }} />
                    <Route path={`${Paths.ajoonamu.support}/faq`} component={FAQ} />
                    <Route path={`${Paths.ajoonamu.support}`} component={Notice} />
                </Switch>
            </div>
        </div>
    );
};
