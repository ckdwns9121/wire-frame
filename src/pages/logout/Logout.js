import React, { useCallback, useEffect } from 'react';
import { localLogout } from '../../api/auth/auth';
import { Paths } from '../../paths';
import { logout } from '../../store/auth/auth';
import { get_address } from '../../store/address/address';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../store/modal';

export default ({ history }) => {
    const dispatch = useDispatch();
    const modalDispatch = useDispatch();

    const openMessage = useCallback((isConfirm,title, text, handleClick = () => {}) => {
        modalDispatch(modalOpen(isConfirm, title, text, handleClick));
    }, [modalDispatch]);

    const onLogoutListener = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            try {
                const res = await localLogout(token);
                if (res.status === 'success') {
                    dispatch(logout());
                    dispatch(get_address({addr1:null,addr2:null}));
                    openMessage(false, '로그아웃 성공!', '성공적으로 로그아웃 되었습니다.');
                    sessionStorage.removeItem('access_token');
                    const noAuthAddrs = JSON.parse(localStorage.getItem('noAuthAddrs'));
                    if(noAuthAddrs){
                        const index = noAuthAddrs.findIndex((item) =>item.active===1);
                        if(index!==-1){
                            const {addr1, addr2} = noAuthAddrs[index];
                            dispatch(get_address({addr1,addr2}));
                        }
                        
                    }
                } else {
                    openMessage(false, '치명적인 에러!');
                }
            } catch (e) {
                openMessage(false, '유효하지 않은 토큰입니다!', '잠시 후 다시 시도해 주세요!');
            }
        } else {
            openMessage(false, '잘못된 접근입니다.', '잠시 후 다시 시도해 주세요!');
        }
        history.replace(Paths.index);
    }, [dispatch, history, openMessage]);

    useEffect(() => {
        onLogoutListener();
    }, [onLogoutListener]);
    return <></>;
};
