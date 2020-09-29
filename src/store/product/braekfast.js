import { createAction, handleActions } from 'redux-actions';

const GET_CATEGORY = 'brakefast/GET_CATEGORY';
const GET_MENULIST = 'brakefast/GET_MENULIST';

export const get_catergory = createAction(GET_CATEGORY);
export const get_menulist = createAction(GET_MENULIST);

const initState = {
    categorys:[],
    items: null,
};

const breakfast = handleActions(
    {
        [GET_CATEGORY]: (state, action) => ({
            ...state,
            categorys: state.categorys.concat(action.payload),
        }),
        [GET_MENULIST]: (state, action) => ({
            ...state,
            items: action.payload,
        }),
    },
    initState,
);

export default breakfast;
