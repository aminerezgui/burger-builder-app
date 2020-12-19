import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    ordered: false
};

const isLoading = (state, action) => {
    return updateObject(state, { loading: true });
};

const orderSuccess = (state, action) => {
    return updateObject(state, {
        orders: state.orders.concat(updateObject(action.order, { id: action.orderId })),
        loading: false,
        ordered: true
    });
};

const orderFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const initOrdered = (state, action) => {
    return updateObject(state, { ordered: false });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.IS_LOADING): return isLoading(state, action);
        case(actionTypes.ORDER_SUCCESS): return orderSuccess(state, action);
        case(actionTypes.ORDER_FAIL): return orderFail(state, action);
        case(actionTypes.INIT_ORDERED): return initOrdered(state, action);
        default: return state;
    }
};

export default reducer;
