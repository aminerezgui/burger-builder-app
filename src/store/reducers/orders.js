import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false
};

const isLoading = (state, action) => {
    return updateObject(state, { loading: true });
};

const ordersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false });
};

const ordersFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.IS_LOADING_): return isLoading(state, action);
        case(actionTypes.ORDERS_SUCCESS): return ordersSuccess(state, action);
        case(actionTypes.ORDERS_FAIL): return ordersFail(state, action);
        default: return state;
    }
};

export default reducer;
