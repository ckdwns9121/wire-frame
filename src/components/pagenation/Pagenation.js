import React from 'react';
import styles from './Pagenation.module.scss';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

const Pagination = ({ postsPerPage, totalPosts, paginate, index }) => {
    const pageNumber = [];

    // 페이지 넘버를 설정하기 위해 페이지당 포스트 개수와 총 포스트 개수를 가져온다.
    // index 를 1로 설정하고, index 가 (총 포스트개수 / 페이지당 포스트 개수) 보다 크지 않을때까지 i값을 올린다.
    // 그리고 그 값을 pageNumber 에 넣어서 설장한다.
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <ul className={styles['pagination']}>
            {pageNumber.map((pageNum) => (
                <li
                    key={pageNum}
                    className={cx('pagination_item', {
                        active: index === pageNum,
                    })}
                    onClick={() => paginate(pageNum)}
                >
                    {pageNum}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
