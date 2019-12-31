import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "../../axios-order";
import withError from "../../hoc/withError";
import Order from "../../components/Order/Order";
import orderContext from "../../Context/OrderContext";
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    static contextType = orderContext;
    state = {
        order: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchOrders()
    }

    fetchOrders = () => {
        axios.get(`/order/${this.context.userId}.json?auth=${this.context.token}`).then((res) => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({ ...res.data[key], id: key })
            }
            this.setState({ loading: false, order: fetchedOrders })
        }).catch((error) => {
            this.setState({ loading: false })
        })
    }

    deleteOrder = (orderID) => {
        this.setState({ loading: true })
        axios.delete(`/order/${this.context.userId}/${orderID}.json?auth=${this.context.token}`).then((res) => {
            this.fetchOrders();
        }).catch((error) => {
            this.setState({ loading: false })
        })
    }


    render() {
        if (!this.context.isAuth) {
            return <Redirect to="/auth" />
        }

        if (!this.state.loading && this.state.order.length === 0) {
            return <h1 style={{ textAlign: "center" }}>You haven't made any order yet.</h1>
        }

        return (
            <div>
                {this.state.loading ? <Spinner /> : this.state.order.map(doc => {
                    return <Order key={doc.id}  {...doc} deleteOrder={this.deleteOrder} />
                })}
            </div>
        )
    }
}

export default withError(Orders, axios);