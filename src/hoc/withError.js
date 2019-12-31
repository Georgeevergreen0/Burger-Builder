import React, { Component } from "react";
import Model from "../components/UI/Modal/Modal";

const withError = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        UNSAFE_componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
                return Promise.reject(error)
            });
        }

        componentWillUnmount() {

            axios.interceptors.response.eject(this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
        }
        errorConfirmHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <>
                    <Model show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        <p style={{ color: "red", "textAlign": "center" }}> {this.state.error ? this.state.error.message : null} </p>
                    </Model>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}
export default withError;