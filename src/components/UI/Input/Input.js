import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    let classesInputElement = [classes.InputElement];
    let errorMessage = null;

    if(props.invalid && props.touched) {
        classesInputElement.push(classes.Invalid);
        errorMessage = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
    }

    switch(props.elementType) {
        case("input"):
            inputElement = <input className={classesInputElement.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case("textarea"):
            inputElement = <textarea className={classesInputElement.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case("select"):
            inputElement = (
                <select className={classesInputElement.join(' ')} value={props.value} onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))
                    }
                </select>
            );
            break;
        default:
            inputElement = <input className={classesInputElement.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
};

export default input;