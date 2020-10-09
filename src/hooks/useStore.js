import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paths } from '../paths';
import { useModal } from './useModal';

export const useStore = (isReplace = true) => {
    const user_token = sessionStorage.getItem('access_token');
    const history = useHistory();
    const openModal = useModal();

    useEffect(() => {
        if (!user_token && isReplace) {
            openModal(
                '로그인이 필요한 서비스입니다.',
                '로그인 후에 이용해 주세요.',
            );
            history.replace(Paths.ajoonamu.signin);
        }
    }, [user_token, history, openModal, isReplace]);

    return user_token;
};

export const useUrl = () => {
    const history = useHistory();
    const location = useLocation();
    const [current, setCurrent] = useState('/');
    const [prev, setPrev] = useState('');

    useEffect(() => {
        setCurrent(location.pathname);
        setPrev(current);
        const obj = {
            current: location.pathname,
            prev: current,
        };
        sessionStorage.setItem('url', JSON.stringify(obj));
    }, [location.pathname]);

    return { prev, current };
};
export const useAddr = () => {
    const user_addr = sessionStorage.getItem('user_addr');
    return user_addr;
};
