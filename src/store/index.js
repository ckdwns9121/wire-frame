import {combineReducers} from 'redux';
import counter from './counter';
import signin,{signin_saga} from './signin';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({counter,signin});

export function* rootSaga(){
    yield all([signin_saga()]);
}

export default rootReducer;