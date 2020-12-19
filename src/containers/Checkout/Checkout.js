import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: this.props.location.state ? this.props.location.state.ingredients : [],
    //     totalPrice: this.props.location.state ? this.props.location.state.totalPrice : 0
    // }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace("/Checkout/Contact-Data");
    }

    render() {
        let summary = <Redirect to='/' />;

        if(this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        cancelCheckout={this.cancelCheckout}
                        continueCheckout={this.continueCheckout} />
                    <Route
                        path={this.props.match.url + "/Contact-Data"}
                        // render={() => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />} 
                        component={ContactData} />
                </div>
            );
        }

        if(this.props.ordered) {
            summary =  <Redirect to='/' />;
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        ordered: state.order.ordered
    };
};

export default connect(mapStateToProps)(Checkout);