import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, isValid } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                valueType: "Email",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valueType: "Password",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signup: true
    }

    inputChangedHandler = (event, controlName) => {

        const controlsUpdated = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: isValid(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });


        // const controlsUpdated = {...this.state.controls};
        // const controlUpdated = controlsUpdated[controlName];
        
        // controlUpdated.value = event.target.value;
        
        // controlUpdated.valid = this.isValid(controlUpdated.value, controlUpdated.validation);

        // controlUpdated.touched = true;

        // controlsUpdated[controlName] = controlUpdated;


        this.setState({controls: controlsUpdated});
    }

    auth = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.signup);
    }

    switchSign = () => {
        this.setState({signup: !this.state.signup});
    }

    render() {
        let formElementsArray = [];

        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                valueType={formElement.config.valueType} />
        ));

        const errorMessage = this.props.errorMessage ? <p style={{color: "red"}}>{this.props.errorMessage}</p> : null;

        let authShower = (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.auth}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" afterPurchasing={this.switchSign}>SWITCH TO {this.state.signup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );

        if(this.props.loading) {
            authShower = <Spinner />
        }

        if(this.props.logged) {
            authShower = this.props.buildingBurger ? <Redirect to='/Checkout' /> : <Redirect to='/' />;
        }

        return authShower;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        logged: state.auth.logged,
        buildingBurger: state.burgerBuilder.buildingBurger
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
