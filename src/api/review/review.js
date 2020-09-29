import axios from 'axios';
import { Paths } from '../../paths';

const initReview = [

    {
        created_at: '2020-09-29 01:04:08',
        deleted: 0,
        email: 'cuzi.kbg@gmail.com',
        order_id: '1600994163-6096051',
        review_body: '테스트리뷰',
        review_id: 1,
        review_images: null,
        review_rating: '4.5',
        updated_at: '2020-09-29 01:04:08',
    },
    {
        created_at: '2020-09-29 01:04:08',
        deleted: 0,
        email: 'cuzi.kbg@gmail.com',
        order_id: '1600994163-6096051',
        review_body: '테스트리뷰',
        review_id: 2,
        review_images: null,
        review_rating: '4.5',
        updated_at: '2020-09-29 01:04:08',
    },
    {
        created_at: '2020-09-29 01:04:08',
        deleted: 0,
        email: 'cuzi.kbg@gmail.com',
        order_id: '1600994163-6096051',
        review_body: '테스트리뷰',
        review_id: 3,
        review_images: null,
        review_rating: '4.5',
        updated_at: '2020-09-29 01:04:08',
    },
    {
        created_at: '2020-09-29 01:04:08',
        deleted: 0,
        email: 'cuzi.kbg@gmail.com',
        order_id: '1600994163-6096051',
        review_body: '테스트리뷰',
        review_id: 4,
        review_images: null,
        review_rating: '4.5',
        updated_at: '2020-09-29 01:04:08',
    },
    {
        created_at: '2020-09-29 01:04:08',
        deleted: 0,
        email: 'cuzi.kbg@gmail.com',
        order_id: '1600994163-6096051',
        review_body: '테스트리뷰',
        review_id: 5,
        review_images: null,
        review_rating: '4.5',
        updated_at: '2020-09-29 01:04:08',
    },
];

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
    const result = {
        data: {
            query: {
                reviews: initReview
            },
            msg: '성공'
        }
    }
    console.log(result);
    return result;
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