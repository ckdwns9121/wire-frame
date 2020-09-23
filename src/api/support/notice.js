import axios from 'axios';
import { Paths } from '../../paths';

const list = [
    { id: 1, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
    { id: 2, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
    { id: 3, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
    { id: 4, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
    { id: 5, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
    { id: 6, title: 'TEST 공지사항입니다.', created_at: new Date('2020-06-10'), content: '안녕하세요 아주나무입니다. 더욱 나누며 더욱 겸손히 믿을 수 있는 원재료로 건강하고 맛있게 찾아봡겠습니다 ^^' },
];

export const requestNoticeList = async (token, offset, limit) => {
    const req = Paths.api + 'user/notice/list';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            offset, limit
        }
    };
    const result = await axios.get(req, config);
    console.log(result);
    // return result.data.query;
    return { notices: list };
};

export const requestNoticeItem = async (token, id) => {
    const req = Paths.api + 'user/notice/show';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            id
        }
    };

    const result = await axios.get(req, config);
    console.log(result);
    return { notice: list.find(item => item.id === id) }
}