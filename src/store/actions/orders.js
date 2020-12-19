import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

const ordersSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_SUCCESS,
        orders: orders
    };
};

const ordersFail = (error) => {
    return {
        type: actionTypes.ORDERS_FAIL,
        error: error
    };
};

const isLoading = () => {
    return {
        type: actionTypes.IS_LOADING_
    };
};

export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(isLoading());
 
        const fetchedOrders = [];

        axiosInstance.get("/orders.json?auth=" + idToken)
            .then(res => {
                for(let key in res.data) {
                    if(res.data[key].userId === userId){
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                }
                dispatch(ordersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(ordersFail(err));
            });
    };
};
