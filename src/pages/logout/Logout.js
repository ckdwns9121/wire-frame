import React, { useCallback, useEffect } from 'react';
import { localLogout } from '../../api/auth/auth';
import { Paths } from '../../paths';
import {update_user_info,logout} from '../../store/auth/auth';
import {get_address} from '../../store/address/address';
import {  useDispatch } from 'react-redux';

export default ({ history }) => {
    const dispatch = useDispatch();

    const onLogoutListener = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            try {
                const res = await localLogout(token);
                if (res.status === "success") {
                    dispatch(logout());
                    dispatch(get_address(null));
                    alert('성공적으로 로그아웃 되셨습니다.');
                    sessionStorage.removeItem('access_token');
                } else {
                    alert('치명적인 에러!');
                }
            } catch (e) {
                alert('유효하지 않은 토큰입니다!');
            }
        } else {
            alert('잘못된 접근입니다.');
        }
        history.replace(Paths.index);
    }, [history]);

    useEffect(() => {
        onLogoutListener();
    }, [onLogoutListener]);
    return <></>;
}