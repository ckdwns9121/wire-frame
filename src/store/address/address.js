import { createAction, handleActions } from 'redux-actions';

const GET_ADDRESS = 'address/GET_ADDRESS';
const GET_ADDR2 = 'address/GET_ADDR2';

export const get_address = createAction(GET_ADDRESS);

const initState = {
    addr1: null,
    addr2: null,
};

const product = handleActions(
    {
        [GET_ADDRESS]: (state, action) => {
            return { addr1: action.payload.addr1, addr2: action.payload.addr2 };
        },
    },
    initState,
);

export default product;
