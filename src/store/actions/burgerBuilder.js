import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};

const fetchingInitialOrder = (ingredients, error, price) => {
    return {
        type: actionTypes.FETCH_INITIAL_ORDER,
        ingredients: ingredients,
        error: error,
        price: price
    };
};

export const fetchInitial = () => {
    return dispatch => {
        let initialOrder = {};    

        axiosInstance.get("/initialOrder.json")
            .then(response => {
                initialOrder = response.data;
                dispatch(fetchingInitialOrder(initialOrder.ingredients, null, initialOrder.price));
            })
            .catch(error => {
                // console.log(error);
                dispatch(fetchingInitialOrder(null, error, 0));
            });
    };
};
