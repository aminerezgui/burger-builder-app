import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    // state = {
    //     fetchedOrders: [],
    //     loading: true
    // };

    componentDidMount()
    {
        // const fetchedOrders = [];

        // axiosInstance.get("/orders.json")
        //     .then(res => {
        //         this.setState({loading: false});

        //         for(let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({fetchedOrders: fetchedOrders});
        //         // console.log(this.state.fetchedOrders);
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });

        this.props.fetchOrders(this.props.idToken, this.props.userId);
    }

    render() {
        let orders = (
                <div>
                    {
                        this.props.orders.map(order => {
                            return <Order key={order.id} ingredients={order.ingredients} price={order.price} />;
                        })
                    }
                </div>
            );

        if(this.props.loading) {
            orders = <Spinner />;
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        idToken: state.auth.idToken,
        logged: state.auth.logged,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (idToken, userId) => dispatch(actions.fetchOrders(idToken, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
