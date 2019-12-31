import React, { Component } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import orderContext from "../../../Context/OrderContext";
import "./NavigationItems.css"

class navigationitems extends Component {
    static contextType = orderContext;

    render() {
        return (
            <ul className="NavigationItems">
                <NavigationItem link="/" exact > Burger</NavigationItem>
                {this.context.isAuth ? <NavigationItem link="/orders" > Orders</NavigationItem> : null}
                {this.context.isAuth ? <NavigationItem link="/logout" >Logout</NavigationItem> : <NavigationItem link="/auth" >Login</NavigationItem>}
            </ul>
        )
    }

}

export default navigationitems;