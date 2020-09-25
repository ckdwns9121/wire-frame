import { useEffect } from 'react';

export const useScroll = () => {

    useEffect(() => {
        window.scrollTo(0,0);    
    }, []);
};


