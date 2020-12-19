import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    // console.log("OS");

    const ingredients = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}><span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the followings ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType={"Danger"} afterPurchasing={props.removePurchasing}>CANCEL</Button>
            <Button btnType={"Success"} afterPurchasing={props.purchased}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;