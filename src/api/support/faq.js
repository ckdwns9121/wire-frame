import axios from 'axios';
import { Paths } from '../../paths';

const list = [
    { id: 1, question: '회원가입은 어떻게 하나요?', answer: '안녕하세요 아주나무입니다. 회원가입은 상단에서 로그인 옆 회원가입을 통해 가능합니다.', created_at: new Date('2020-06-01') },
    { id: 2, question: '회원가입은 어떻게 하나요?', answer: '안녕하세요 아주나무입니다. 회원가입은 상단에서 로그인 옆 회원가입을 통해 가능합니다.', created_at: new Date('2020-06-01') },
    { id: 3, question: '회원가입은 어떻게 하나요?', answer: '안녕하세요 아주나무입니다. 회원가입은 상단에서 로그인 옆 회원가입을 통해 가능합니다.', created_at: new Date('2020-06-01') },
    { id: 4, question: '회원가입은 어떻게 하나요?', answer: '안녕하세요 아주나무입니다. 회원가입은 상단에서 로그인 옆 회원가입을 통해 가능합니다.', created_at: new Date('2020-06-01') },
    { id: 5, question: '회원가입은 어떻게 하나요?', answer: '안녕하세요 아주나무입니다. 회원가입은 상단에서 로그인 옆 회원가입을 통해 가능합니다.', created_at: new Date('2020-06-01') },
];

export const requestFAQList = async (faq_type) => {
    const req = Paths.api + 'user/faq/list';
    const params = {
        faq_type,
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params,
    };
    const result = await axios.get(req, config);
    console.log(result);
    // return result.data.query;
    return list;
};
