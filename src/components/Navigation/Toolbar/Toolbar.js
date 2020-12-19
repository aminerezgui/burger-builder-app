import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle openSideDrawer={props.openSideDrawer} />
        <Logo height={"80%"}/>
        <nav className={classes.Hide}>
            <NavigationItems logged={props.logged} />
        </nav>
    </header>
);

export default toolbar;
