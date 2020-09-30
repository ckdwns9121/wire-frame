import { combineReducers } from 'redux';
import auth, { auth_saga } from './auth/auth';
import {product, breakfast} from './product';
import modal from './modal';
import {address,store} from './address';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, product,breakfast, modal,address,store });

export function* rootSaga() {
    yield all([auth_saga()]);
}

export default rootReducer;
