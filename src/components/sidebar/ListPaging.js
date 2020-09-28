import React from 'react';
import classnames from 'classnames/bind';
import { IconButton } from '@material-ui/core';
import { Link } from "react-router-dom";
import styles from './ListPaging.module.scss';
import Prev from '../svg/paging/Prev';
import Next from '../svg/paging/Next';

const cn = classnames.bind(styles);

export default ({ baseURL, currentPage, pagePerView, totalCount }) => {
    const lastPage = Math.ceil(totalCount / pagePerView);
    console.log(lastPage);

    return (
        <div className={styles['paging']}>
            <LinkItem to={baseURL + '?page=0'}>
                <Prev />
            </LinkItem>
            <ul className={styles['list']}>
                <li className={cn('number', { active: currentPage })}>
                    <LinkItem to={baseURL + '?page=1'}>
                        1
                    </LinkItem>
                </li>
            </ul>
            <LinkItem to={baseURL + '?page=2'}>
                <Next />
            </LinkItem>
        </div>
    );
};

const LinkItem = ({ children, to }) => (
    <IconButton className={styles['button']}>
        {to ? <Link className={styles['link']} to={to}>
            {children}
        </Link> : children}
    </IconButton>
);