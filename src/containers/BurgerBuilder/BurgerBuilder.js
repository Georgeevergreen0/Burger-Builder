import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withError from "../../hoc/withError";
import OrderContext from "../../Context/OrderContext"


class BurgerBuilder extends Component {
    static contextType = OrderContext;
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.context.fetchIngredient()
    }

    componentWillUnmount() {
        this.context.undoError()
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((value) => {
            return ingredients[value]
        }).reduce((number, value) => {
            return number + value
        }, 0);

        return sum > 0
    }

    purchaseHandler = () => {
        if (this.context.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disableInfo = {
            ...this.context.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        const maxContentReached = {
            ...this.context.ingredients
        };
        const maxContent = [];
        for (let key in maxContentReached) {
            maxContent.push(maxContentReached[key])
        }
        const maxContentDisabled = maxContent.reduce(function (start, value) {
            return start + value;
        }, 0)
        const maxReached = maxContentDisabled >= 10;

        let orderSummary = null;
        let burger = this.context.error ? <h1 style={{ textAlign: "center" }}>Ingredients can't be loaded check your network!!!</h1> : <Spinner />;

        if (this.context.ingredients) {
            burger = (<>
                <Burger ingredients={this.context.ingredients} />
                <BuildControls ingredientAdded={this.context.addIngredientHandler}
                    ingredientRemoved={this.context.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.context.totalPrice}
                    purchasable={this.updatePurchaseState(this.context.ingredients)}
                    purchasing={this.purchaseHandler}
                    maxReached={maxReached}
                    isAuth={this.context.isAuth}

                />
            </>);
            orderSummary = <OrderSummary ingredients={this.context.ingredients}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler}
                price={this.context.totalPrice} />;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withError(BurgerBuilder, axios)