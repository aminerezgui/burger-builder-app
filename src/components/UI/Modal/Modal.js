import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    // componentDidUpdate() {
    //     console.log("Mo");
    // }

    // componentDidMount()
    // {
    //     console.log("Modal mounted !");
    // }

    shouldComponentUpdate(nextProps, nextState)
    {
        return (nextProps.purchasing !== this.props.purchasing) || (nextProps.loading !== this.props.loading);
    }

    render() {
        return (
            <Aux>
                <Backdrop purchasing={this.props.purchasing} removePurchasing={this.props.removePurchasing} />
                <div className={classes.Modal}
                     style={{
                        transform: this.props.purchasing ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.purchasing ? "1" : "0"
                        }}>
                            {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;