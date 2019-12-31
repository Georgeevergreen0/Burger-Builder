import React from "react";
import { Redirect } from "react-router-dom";
import orderContext from "../../Context/OrderContext";

class Logout extends React.Component {
    static contextType = orderContext;

    componentDidMount() {
        this.context.authLogout(0)
    }

    render() {
        return <Redirect to="/auth" />
    }
}

export default Logout;