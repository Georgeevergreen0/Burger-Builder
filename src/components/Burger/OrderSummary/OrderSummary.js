import React from "react";
import Button from "../../UI/Button/Button";

class orderSummary extends React.Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(value => {
            return <li key={value}><span style={{ textTransform: "capitalize" }}>{value}</span> : {this.props.ingredients[value]}</li>
        })
        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><b>Total Price: ${this.props.price.toFixed(2)}</b></p>
                <p>continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType=" Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </>

        )
    }


}


export default orderSummary;