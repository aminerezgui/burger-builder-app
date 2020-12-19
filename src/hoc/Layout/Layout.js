import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        sideDrawerShowed: false
    }

    closeSideDrawer = () =>
    {
        this.setState({sideDrawerShowed: false});
    }

    openSideDrawer = () =>
    {
        this.setState((prevState) => {
            return {sideDrawerShowed: !prevState.sideDrawerShowed};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.openSideDrawer} logged={this.props.logged} />
                <SideDrawer backdropShowed={this.state.sideDrawerShowed} closeBackdrop={this.closeSideDrawer} logged={this.props.logged} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.logged
    };
};

export default connect(mapStateToProps)(Layout);
