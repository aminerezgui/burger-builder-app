import React, { Component, Suspense, lazy } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import Spinner from './components/UI/Spinner/Spinner';

const Auth = lazy(() => import('./containers/Auth/Auth'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
            {this.props.logged ?
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path="/auth" component={Auth} />

                <Route path="/Checkout" component={Checkout} />
                <Route path="/Orders" component={Orders} /> 
                <Route path="/logout" component={Logout} />

                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to='/' />
              </Switch>
            </Suspense>
            :
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path="/auth" component={Auth} />

                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to='/' />
              </Switch>
            </Suspense>}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.auth.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
