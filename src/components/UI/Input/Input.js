import React from "react";
import "./Input.css"
const input = (props) => {

    let inputType = null;
    let validationMessage = null
    let defaultClassName = ["InputType"]

    if (!props.isValid && props.isTouched) {
        defaultClassName.push("Invalid")
        validationMessage = props.validationMessage
    }


    switch (props.inputType) {
        case ("input"):
            inputType = <input className={defaultClassName.join(" ")} {...props.inputConfig} value={props.value} onChange={props.changed} />;
            break;

        case ("textarea"):
            inputType = <textarea className={defaultClassName.join(" ")} {...props.inputConfig} value={props.value} onChange={props.changed} />;
            break;
        case ("select"):
            inputType = <select className={defaultClassName.join(" ")} value={props.value} onChange={props.changed} >
                {props.inputConfig.options.map((option) => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>
            break;

        default:
            inputType = null;
            break;
    }

    return (
        <div className="Input">
            <label className="Label" >{props.label}</label>
            {inputType}
            {validationMessage}
        </div>
    )
}
export default input;