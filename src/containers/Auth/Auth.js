import React, { Component } from "react";
import axios from "axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import orderContext from "../../Context/OrderContext";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Auth.css";


class Auth extends Component {
    static contextType = orderContext;
    state = {
        controls: {
            email: {
                inputType: "input",
                value: "",
                valid: false,
                touched: false,
                valitation: {
                    isRequired: true,
                },
                validationMessage: "Email is required!!!",
                inputConfig: {
                    type: "email",
                    placeholder: "Enter email address"
                }
            },
            password: {
                inputType: "input",
                value: "",
                valid: false,
                touched: false,
                valitation: {
                    isRequired: true,
                },
                validationMessage: "Password is required!!!",
                inputConfig: {
                    type: "password",
                    placeholder: "Enter Password"
                }
            },
        },
        switchToSignUp: true
    };

    componentWillUnmount() {
        this.context.undoError()
    }


    checkvalidity = (value, valitation) => {
        let isValidValue = true
        if (valitation.isRequired) {
            isValidValue = value.trim() !== "" && isValidValue;
        }

        return isValidValue;
    }


    inputChangeHandler = (event, inputName) => {
        const updatedControls = {
            ...this.state.controls,
            [inputName]: {
                ...this.state.controls[inputName],
                value: event.target.value,
                touched: true,
                valid: this.checkvalidity(event.target.value, this.state.controls[inputName].valitation)
            }
        }
        this.setState({ controls: updatedControls })
    }


    submitForm = (e) => {
        e.preventDefault();
        let urlAddress = this.state.switchToSignUp ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUELeasUL12oBIicGskk6W3i6Y7oHmSm0` : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUELeasUL12oBIicGskk6W3i6Y7oHmSm0`;
        this.context.authStart();
        const formInputData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        }

        axios.post(urlAddress, formInputData).then(res => {
            window.localStorage.setItem("userId", res.data.localId);
            window.localStorage.setItem("token", res.data.idToken);
            window.localStorage.setItem("expiresIn", Date.now() + (res.data.expiresIn * 1000));

            this.context.authLogout(res.data.expiresIn * 1000)
            this.context.authSuccess(res.data.localId, res.data.idToken)
            this.props.history.push("/")

        }).catch(err => {
            this.context.authFailure(err)
        })

    }

    switchSubmitMethod = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return { switchToSignUp: !prevState.switchToSignUp }
        })

    }

    render() {
        const formElementArray = [];
        let isSubmitEnabled = true;

        for (let key in this.state.controls) {
            isSubmitEnabled = this.state.controls[key].valid === true && isSubmitEnabled
            formElementArray.push({ inputName: key, ...this.state.controls[key] })
        }

        let form = (
            formElementArray.map(formElement => (
                <Input key={formElement.inputName}
                    inputType={formElement.inputType}
                    inputConfig={formElement.inputConfig}
                    value={formElement.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.inputName)}
                    isValid={formElement.valid}
                    isTouched={formElement.touched}
                    validationMessage={<p>{formElement.validationMessage}</p>}
                />))
        );

        if (this.context.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.context.error) {
            if (this.context.error.response) {
                errorMessage = this.context.error.response.data.error.message
            } else {
                errorMessage = "An Error Occured While Making Request"
            }
        }
        return (<div className="Auth">
            <h1>
                {this.state.switchToSignUp ? "SignUp" : "Login"}
            </h1>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <form onSubmit={this.submitForm}>
                {form}
                <div>
                    <Button btnType="Success" clicked={this.submitForm} disabled={!isSubmitEnabled}>Submit</Button>
                </div>
                <div>
                    <Button btnType="Neutral" clicked={this.switchSubmitMethod}>{this.state.switchToSignUp ? "I have an account switch to login" : "To create account switch to signup"}</Button>
                </div>
            </form>
        </div>)
    }


}

export default Auth;