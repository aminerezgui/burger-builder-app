import React from 'react';

import classes from './Order.css';

const order = (props) => {
    let ingredients = [];

    for(let ingredient in props.ingredients) {
        ingredients.push({
            ingredientName: ingredient,
            amount: props.ingredients[ingredient]
        })
    }

    let ingredientsOutputted = ingredients.map(ingredient => {
        return (
        <span style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px"
        }}
            key={ingredient.ingredientName}>
            {ingredient.ingredientName}({ingredient.amount})
        </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutputted}</p>
            <p>Price: <strong>{(+props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;