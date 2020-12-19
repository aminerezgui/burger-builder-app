import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENTS_PRICES = {
    meat: 1.5,
    cheese: 0.75,
    salad: 0.5,
    bacon: 1
};

const initialState = {
    ingredients: null, //{
        // cheese: 1,
        // salad: 1,
        // meat: 1,
        // bacon: 1
    // },
    totalPrice: 0,
    purchasable: false,
    error: false,
    buildingBurger: false
};

const ingredientsSum = (ingredients) => {
    const sum = Object.keys(ingredients).map(ingKey => ingredients[ingKey]).reduce((sum, el) =>
                {
                    return sum + el;
                }, 0);
    return sum;
};

const addIngredient = (state, action) => {
    const preUpdatedState = updateObject(state, {ingredients:
        updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}),
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        buildingBurger: true});

    const sum = ingredientsSum(preUpdatedState.ingredients);

    return updateObject(preUpdatedState, {purchasable: (sum > 0)});
};

const removeIngredient = (state, action) => {
    if(state.ingredients[action.ingredientName] > 0) {
        const preUpdatedState = updateObject(state, {
            ingredients: updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }),
            totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
        });
        
        const sum = ingredientsSum(preUpdatedState.ingredients);

        return updateObject(preUpdatedState, { purchasable: (sum > 0), buildingBurger: true && (sum > 0) });
    }
    return state;
};

const fetchInitialOrder = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: action.error,
        totalPrice: action.price,
        purchasable: (ingredientsSum(action.ingredients) > 0),
        buildingBurger: false
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        // here an example of refactoring reducer to have a lean code
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case(actionTypes.FETCH_INITIAL_ORDER): return fetchInitialOrder(state, action);
        default: return state;
    }
};

export default reducer;
