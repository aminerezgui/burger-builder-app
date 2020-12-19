import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.purchasing ? <div className={classes.Backdrop} onClick={props.removePurchasing}></div> : null
);

export default backdrop;