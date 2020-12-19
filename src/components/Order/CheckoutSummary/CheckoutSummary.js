import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tates well !</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType={"Danger"} afterPurchasing={props.cancelCheckout}>
                Cancel
            </Button>
            <Button btnType={"Success"} afterPurchasing={props.continueCheckout}>
                Continue
            </Button>
        </div>
    );
}

export default checkoutSummary;