import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {

    return (
        <div className="CheckoutSummary">
            <h1 className="Header">Order Your Delicious Burger !!!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;