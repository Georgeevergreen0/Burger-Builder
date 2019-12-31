import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";


const sideDrawer = (props) => {
    let attachedClasses = "SideDrawer Close"
    if (props.show) {
        attachedClasses = "SideDrawer Open"
    }
    return (
        <>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses} onClick={props.closed}>
                <Logo height="25%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}
export default sideDrawer;