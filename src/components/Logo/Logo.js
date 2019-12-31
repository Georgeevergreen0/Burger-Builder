import React from "react";
import BurgerLogo from "../../assets/images/burger-flat.jpeg";
import "./Logo.css";

const logo = (props) => (
    <div className="Logo" style={{ height: props.height }}>
        <img src={BurgerLogo} alt="Burger Logo" />
    </div>
);

export default logo