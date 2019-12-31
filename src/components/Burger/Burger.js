import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = function (props) {
    let transformedIngredient = Object.keys(props.ingredients).map(function (value) {
        return [...Array(props.ingredients[value])].map(function (_, index) {
            return <BurgerIngredient key={value + index} type={value} />;
        })
    }).reduce(function (init, value) {
        return init.concat(value)
    }, []);

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please Start Adding Ingredients</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;