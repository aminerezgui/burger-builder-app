import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

const orderSuccess = (id, order) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        order: order
    };
};

const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    };
};

const isLoading = () => {
    return {
        type: actionTypes.IS_LOADING
    };
};

export const order = (order, idToken) => {
    return dispatch => {
        dispatch(isLoading());
        axiosInstance.post('/orders.json?auth=' + idToken, order)
        .then(response => {
            dispatch(orderSuccess(response.data.name, order));
        })
        .catch(error => {
            dispatch(orderFail(error));
        });
    };
};

export const initOrdered = () => {
    return {
        type: actionTypes.INIT_ORDERED
    };
};