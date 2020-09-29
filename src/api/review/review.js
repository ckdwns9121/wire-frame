import axios from 'axios';
import { Paths } from '../../paths';

export const requestGetReviewList = async (offset, limit) => {
    const req = Paths.api + 'user/review/list';

    axios.defaults.headers['Context-Type'] = 'application/json';
    const config = {
        params: {
            offset, limit
        }
    };

    const res = await axios.get(req, config);
    console.log(res);
    return res;
};

export const requestGetReviewMyList = async (token, offset, limit) => {
    const req = Paths.api + 'user/review/mypage_list';
    const config = {
        params: {
            offset, limit
        }
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers['Context-Type'] = 'application/json';

    const res = await axios.get(req, config);
    return res;
};

export const requestGetReviewView = async (review_id) => {
    const req = Paths.api + 'user/review/view';

    const config = {
        params: {
            review_id
        }
    };
    axios.defaults.headers['Context-Type'] = 'application/json';

    const res = await axios.get(req, config);
    return res;
}

export const requestPostReviewStore = async (token, {
    order_id, review_body, review_rating, 
    review_images
}) => {
    const req = Paths.api + 'user/review';
    
    const formData = new FormData();
    formData.append('order_id', order_id);
    formData.append('review_body', review_body);
    formData.append('review_rating', review_rating);
    formData.append('review_images[]', review_images);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers['Context-Type'] = 'application/json';

    const res = await axios.post(req, formData);
    return res;
}

export const requestPostReviewUpdate = async (token, {
    review_id, review_body, review_rating, 
    review_images
}) => {
    const req = Paths.api + 'user/review/update';
    
    const formData = new FormData();
    formData.append('review_id', review_id);
    formData.append('review_body', review_body);
    formData.append('review_rating', review_rating);
    formData.append('review_images[]', review_images);
    formData.append('_method', 'put');
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers['Context-Type'] = 'application/json';

    const res = await axios.post(req, formData);
    return res;
}