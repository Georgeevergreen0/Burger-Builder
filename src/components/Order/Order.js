import React from "react";
import "./Order.css";


const Order = (props) => {
    const ingridients = [];
    for (let key in props.ingredients) {
        ingridients.push(
            <span style={{ display: "inline-block", margin: "0 8px", border: "1px solid #ccc", padding: "5px" }} key={key}>
                {key.toUpperCase()} {props.ingredients[key]}
            </span>)
    }
    return (
        <div className="Order">
            <button onClick={() => props.deleteOrder(props.id)}> Delete Order</button>
            <p>Date: <strong>{props.date}</strong></p>
            <p>Name: <strong>{props.name}</strong></p>
            <p>Email: <strong>{props.email}</strong></p>
            <p>Delivary Method: <strong>{props.delivaryMethod}</strong></p>
            <p>Country: <strong>{props.country}</strong></p>
            <p>PRICE: <strong>${props.price.toFixed(2)}.</strong></p>
            <div>INGREDIENTS: {ingridients}</div>
        </div>
    )
}

export default Order