import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { useModal } from './useModal';
import { get_address } from '../store/address/address';
import { get_near_store } from '../store/address/store';
import { get_menulist } from '../store/product/product';
import { Paths } from '../paths';

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
    const location = useLocation();
    const [current, setCurrent] = useState('/');
    const [prev, setPrev] = useState('');

    const { pathname, search } = location;

    useEffect(() => {
        const next = pathname + search;
        setCurrent(next);
        setPrev(current);
        const obj = {
            current: next,
            prev: current,
        };
        sessionStorage.setItem('url', JSON.stringify(obj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return { prev, current };
};
export const useAddr = () => {
    const user_addr = sessionStorage.getItem('user_addr');
    return user_addr;
};

export const useInit = () => {
    const dispatch = useDispatch();
    const initStore = (
        addr1 = null,
        addr2 = null,
        lat = null,
        lng = null,
        post_num = null,
        near_store = null,
    ) => {
        dispatch(get_address({ addr1, addr2, lat, lng, post_num }));
        dispatch(get_near_store(near_store));
        dispatch(get_menulist(null));
    };
    return initStore;
};
