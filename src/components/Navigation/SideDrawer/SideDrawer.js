import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Open];
    if(!props.backdropShowed)
    {
        attachedClasses = [classes.SideDrawer, classes.Close];
    }

    return (
        <Aux>
            <Backdrop purchasing={props.backdropShowed} removePurchasing={props.closeBackdrop} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems clicked={props.closeBackdrop} logged={props.logged} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
