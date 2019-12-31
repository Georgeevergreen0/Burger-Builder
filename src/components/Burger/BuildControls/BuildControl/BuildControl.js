import React from "react";
import "./BuildControl.css";

const buildControl = function (props) {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button onClick={props.removed} className="Less" disabled={props.disabled}>less</button>
            <button onClick={props.added} className="More" disabled={props.maxReached} >more</button>
        </div>
    )
}
export default buildControl