import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];

const buildControls = (props) => {

    let orderButton = (
        <button className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.purchasing}>
            ORDER NOW
        </button>
    );

    if(!props.logged) {
        orderButton = (
            <button className={classes.OrderButton} 
                    disabled={!props.purchasable}
                    onClick={props.goToAuth}>
                SIGN UP OR SIGN IN TO ORDER NOW
            </button>
        );
    }

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((control) => (
                <BuildControl 
                key={control.label} 
                label={control.label}
                addIngredient={() => props.addIngredient(control.type)} 
                removeIngredient={() => props.removeIngredient(control.type)} 
                disabled={props.disabled[control.type]} />
            ))}
            {orderButton}
        </div>
    );
};

export default buildControls;
