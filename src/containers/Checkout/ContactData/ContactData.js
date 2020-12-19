import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, isValid } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valueType: "Name",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-MAIL'
                },
                value: '',
                valueType: "Email",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valueType: "Street",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                valueType: "Zip code",
                validation: {
                    required: true,
                    length: 5 
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valueType: "Country",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivering: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        // loading: false,
        formIsValid: false
    };

    order = (event) =>
    {
        event.preventDefault();

        // this.setState({loading: true});

        const formData = {};

        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.order(order, this.props.idToken);

        // axiosInstance.post('/orders.json', order)
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         // console.log(error);
        //         this.setState({loading: false});
        //     });
    }

    inputChangedHandler = (event, formIdentifier) => {

        let orderFormUpdated = updateObject(this.state.orderForm, {
            [formIdentifier]: updateObject(this.state.orderForm[formIdentifier], {
                value: event.target.value
            })
        });

        if(formIdentifier !== "delivering"){
            orderFormUpdated = updateObject(orderFormUpdated, {
                [formIdentifier]: updateObject(orderFormUpdated[formIdentifier], {
                    valid: isValid(orderFormUpdated[formIdentifier].value, orderFormUpdated[formIdentifier].validation),
                    touched: true
                })
            });
        }



        // const orderFormUpdated = {...this.state.orderForm};
        // const formElementUpdated = orderFormUpdated[formIdentifier];
        
        // formElementUpdated.value = event.target.value;
        
        // if(formIdentifier !== "delivering") {
        //     formElementUpdated.valid = this.isValid(formElementUpdated.value, formElementUpdated.validation);
        //     // console.log(formElementUpdated.valid);

        //     formElementUpdated.touched = true;
        // }
        // orderFormUpdated[formIdentifier] = formElementUpdated;





        let formIsValid = false;

        for(let key in orderFormUpdated) {
            formIsValid = orderFormUpdated[key].valid;
            if(formIsValid === false) {
                break;
            }
        }

        // console.log(formIsValid);

        this.setState({orderForm: orderFormUpdated, formIsValid: formIsValid});
    }

    render(){
        let formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.order}>
                {
                    formElementsArray.map(formElement => (
                        <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                valueType={formElement.config.valueType} />
                    ))
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        idToken: state.auth.idToken,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        order: (order, idToken) => dispatch(actions.order(order, idToken))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance)));
