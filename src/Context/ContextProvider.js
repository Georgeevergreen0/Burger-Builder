import React from "react";
import OrderContext from "./OrderContext";

const INGREDIENT_PRICES = {
    salad: 2,
    bacon: 2,
    cheese: 1.5,
    meat: 2.5
}

class ContextProvider extends React.Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        isAuth: false,
        userId: null,
        token: null,
        loading: false,
        error: false,

    }

    fetchIngredient = () => {
        this.setState({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            }, totalPrice: 5, error: false
        })
    }



    addIngredientHandler = (ingredientName) => {
        const newIngredient = { ...this.state.ingredients };
        newIngredient[ingredientName] = this.state.ingredients[ingredientName] + 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[ingredientName];
        this.setState({ ingredients: newIngredient, totalPrice: newPrice });
    }

    removeIngredientHandler = (ingredientName) => {
        const newIngredient = { ...this.state.ingredients };
        newIngredient[ingredientName] = this.state.ingredients[ingredientName] - 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[ingredientName];
        this.setState({ ingredients: newIngredient, totalPrice: newPrice });
    }

    undoError = () => {
        this.setState({ error: null })
    }

    authStart = () => {
        this.setState({ loading: true })
    }

    authSuccess = (localId, idToken) => {
        this.setState({ isAuth: true, userId: localId, token: idToken, loading: false, error: false })
    }

    authFailure = (err) => {
        this.setState({ isAuth: false, userId: null, token: null, loading: false, error: err })
    }

    authLogout = (time) => {
        window.setTimeout(() => {
            window.localStorage.clear();
            this.setState({ isAuth: false, userId: null, token: null, error: false })
        }, time)
    }

    render() {
        const contextValue = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            fetchIngredient: this.fetchIngredient,
            undoError: this.undoError,
            addIngredientHandler: this.addIngredientHandler,
            removeIngredientHandler: this.removeIngredientHandler,
            authStart: this.authStart,
            authSuccess: this.authSuccess,
            authFailure: this.authFailure,
            authLogout: this.authLogout,
            isAuth: this.state.isAuth,
            userId: this.state.userId,
            token: this.state.token,
            loading: this.state.loading,
            error: this.state.error,
        };

        return (
            <OrderContext.Provider value={contextValue} >
                {this.props.children}
            </OrderContext.Provider>
        )
    }
}

export default ContextProvider;