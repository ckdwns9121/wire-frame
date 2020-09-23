import { createAction, handleActions } from 'redux-actions';

const GET_ADDRESS = 'address/GET_ADDRESS';

export const get_address = createAction(GET_ADDRESS);

const initState = {
  address:null,
};

const product = handleActions(
    {
        [GET_ADDRESS]: (state, action) => ({
            address: action.payload,
        }),

    },
    initState,
);

export default product;
