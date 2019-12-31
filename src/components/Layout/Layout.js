import React from "react";
import "./Layout.css"
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SiderDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    state = { show: false }

    SiderDrawerClose = () => {
        this.setState({ show: false })
    }

    SiderDrawerOpen = () => {
        this.setState({ show: true })
    }

    render() {
        return (
            <>
                <Toolbar click={this.SiderDrawerOpen} />
                <SiderDrawer closed={this.SiderDrawerClose} show={this.state.show} />
                <main className="Layout-main">{this.props.children}</main>
            </>
        );
    }

}


export default Layout