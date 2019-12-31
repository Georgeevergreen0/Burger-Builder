import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Logout/Logout";
import orderContext from "./Context/OrderContext"



class App extends Component {

    static contextType = orderContext;

    componentDidMount() {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        let expiresIn = localStorage.getItem("expiresIn");

        if (!userId && !token && !expiresIn) {
            this.context.authLogout(0)
        } else {
            if (expiresIn > Date.now()) {
                this.context.authLogout(expiresIn - Date.now())
                this.context.authSuccess(userId, token)
            } else {
                this.context.authLogout(0)
            }
        }
    }


    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>

        )

        if (this.context.isAuth) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

export default App;