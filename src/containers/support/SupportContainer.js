import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './SupportContainer.module.scss';

import { Paths } from '../../paths';
import Sidebar from '../../components/sidebar/Sidebar';

import Notice from '../../components/support/Notice';
import FAQ from '../../components/support/FAQ';
import QNA from '../../components/support/QNA';

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
                    <Route path={`${Paths.ajoonamu.support}/notice/:id?`} component={Notice} />
                    <Route path={`${Paths.ajoonamu.support}/qna/:id?`} component={QNA} />
                    <Route path={`${Paths.ajoonamu.support}/faq`} component={FAQ} />
                </Switch>
            </div>
        </div>
    );
};
