import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    let authShower = <NavigationItem clicked={props.clicked} link="/auth" exact={false}>Authenticate</NavigationItem>;

    if(props.logged) {
        authShower = <NavigationItem clicked={props.clicked} link="/logout" exact={false}>Log out</NavigationItem>;
    }

    return (
            <ul className={classes.NavigationItems}>
                <NavigationItem clicked={props.clicked} link="/" exact={true}>Burger Builder</NavigationItem>
                {props.logged ? <NavigationItem clicked={props.clicked} link="/Orders" exact={false}>Orders</NavigationItem> : null}
                {authShower}
            </ul>
    );
};

export default navigationItems;
