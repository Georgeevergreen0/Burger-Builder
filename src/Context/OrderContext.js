import React from "react";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 5,
    isAuth: true,
    userId: null,
    token: null,
    loading: false,
    error: null,
    fetchIngredient: () => { },
    addIngredientHandler: () => { },
    removeIngredientHandler: () => { },
    authStart: () => { },
    authSuccess: () => { },
    authFailure: () => { },
    authLogout: () => { },
    undoError: () => { },
}

const OrderContext = React.createContext(initialState);

export default OrderContext;