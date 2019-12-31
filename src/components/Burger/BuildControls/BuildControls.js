import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import button from "../../UI/Button/Button";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
]
const buildControls = function (props) {
    return (
        <div className="BuildControls">
            <p className="Price">  Price: <b>${props.price.toFixed(2)}</b></p>
            {controls.map((value) => {
                return <BuildControl
                    key={value.label}
                    label={value.label}
                    added={() => props.ingredientAdded(value.type)}
                    removed={() => props.ingredientRemoved(value.type)}
                    disabled={props.disabled[value.type]}
                    maxReached={props.maxReached} />
            })}
            {props.isAuth ? <button className="OrderButton" onClick={props.purchasing} disabled={!props.purchasable}> ORDER NOW</button> :
                <button className="OrderButton" onClick={props.purchasing}> Login First</button>}

        </div>
    )
}


export default buildControls;