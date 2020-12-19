import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    logged: false
};

const authStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.localId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {idToken: null, userId: null, logged: false});
};

const authLogged = (state, action) => {
    return updateObject(state, {logged: true});
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.AUTH_START): return authStart(state, action);
        case(actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
        case(actionTypes.AUTH_FAIL): return authFail(state, action);
        case(actionTypes.AUTH_LOGOUT): return authLogout(state, action);
        case(actionTypes.AUTH_LOGGED): return authLogged(state, action);
        default: return state;
    }
};

export default reducer;
