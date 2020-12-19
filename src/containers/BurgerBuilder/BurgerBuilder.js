import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

// const INGREDIENTS_PRICES = {
//     meat: 1.5,
//     cheese: 0.75,
//     salad: 0.5,
//     bacon: 1
// };

export class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false//,
        // loading: false,
        // error: false
    };

    componentDidMount()
    {
        // axiosInstance.get("/ingredients.json")
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: error});
        //     });

        this.props.initOrdered();
        this.props.fetchInitial();
        // console.log(this.props.ingredients);
        // console.log("burger builder mounted");
    }

    purchased = () =>
    {
        // console.log(this.props);

        this.props.history.push('/Checkout');

        // this.props.history.push({
        //     pathname: '/Checkout',
        //     state: {
        //        ingredients: this.props.ingredients,
        //        totalPrice: this.props.totalPrice
        //    }
        // });
    }

    removePurchasing = () =>
    {
        this.setState({purchasing: false});
    }

    updatePurchasing = () =>
    {
        this.setState({purchasing: true});
    }

    // updatePurchasable = (ingredients) => {
    //     const sum = Object.keys(ingredients).map(ingKey => ingredients[ingKey]).reduce((sum, el) =>
    //     {
    //         return sum + el;
    //     }, 0);

    //     this.setState({purchasable: (sum > 0)});
    // }

    // addIngredientHandler = (type) =>
    // {
    //     const updatedIngredientCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedIngredientCount;

    //     const updatedTotalPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedTotalPrice
    //     });

    //     this.updatePurchasable(updatedIngredients);
    // }

    // removeIngredientHandler = (type) =>
    // {
    //     if(this.state.ingredients[type] > 0)
    //     {
    //         const updatedIngredientCount = this.state.ingredients[type] - 1;
    //         const updatedIngredients = {...this.state.ingredients};
    //         updatedIngredients[type] = updatedIngredientCount;

    //         const updatedTotalPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

    //         this.setState({
    //             ingredients: updatedIngredients,
    //             totalPrice: updatedTotalPrice
    //         });

    //         this.updatePurchasable(updatedIngredients);
    //     }
    // }

    goToAuth = () => {
        this.props.history.push('/auth');
    }

    render() {

        // console.log(this.props);

        let disabledInfo = {...this.props.ingredients};

        for(let key in disabledInfo)
        {
            disabledInfo[key] = (disabledInfo[key] === 0);
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Error Network</p> : <Spinner />;

        if(this.props.ingredients)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        addIngredient={this.props.addIngredient} 
                        removeIngredient={this.props.removeIngredient}
                        disabled={disabledInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.props.purchasable} 
                        purchasing={this.updatePurchasing}
                        logged={this.props.logged}
                        goToAuth={this.goToAuth} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    removePurchasing={this.removePurchasing}
                    purchased={this.purchased}
                    totalPrice={this.props.totalPrice} />
            );
        }

        // if(this.state.loading)
        // {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal purchasing={this.state.purchasing} removePurchasing={this.removePurchasing} loading={this.state.loading}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error,
        logged: state.auth.logged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        fetchInitial: () => dispatch(actions.fetchInitial()),
        initOrdered: () => dispatch(actions.initOrdered())
    };
};

export default withErrorHandler( connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder) , axiosInstance);