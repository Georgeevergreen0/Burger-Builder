import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import OrderContext from "../../Context/OrderContext";




class Checkout extends Component {

    static contextType = OrderContext;

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }


    render() {

        let checkout = <Redirect to="/" />

        if (this.context.ingredients) {
            checkout = (
                <div>
                    <CheckoutSummary ingredients={this.context.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + "/contact-data"}
                        render={(props) => (<ContactData  {...props} ingredients={this.context.ingredients} price={this.context.totalPrice} />)} />
                </div>
            )
        }

        return checkout;
    }

}


export default Checkout