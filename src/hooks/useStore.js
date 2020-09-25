import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from './useModal';

export const useStore = () => {
    const user_token = sessionStorage.getItem('access_token');
    const history = useHistory();
    const openModal = useModal();

    useEffect(() => {
        if (!user_token) {
            openModal('로그인이 필요한 서비스입니다.', '로그인 후에 이용해 주세요.', () => {
                history.replace('/login');
            });
        }
    }, [user_token, history, openModal]);

    return user_token;
};

export const useAddr = () => {
    const user_addr = sessionStorage.getItem('user_addr');
    return user_addr;
};
