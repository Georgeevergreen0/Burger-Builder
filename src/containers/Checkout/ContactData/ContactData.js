import React, { Component } from "react";
import orderContext from "../../../Context/OrderContext";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withError from "../../../hoc/withError";



class ContactData extends Component {

    static contextType = orderContext;
    state = {
        orderForm: {
            name: {
                inputType: "input",
                value: "",
                valid: false,
                touched: false,
                valitation: {
                    isRequired: true,
                },
                validationMessage: "Name is required!!!",
                inputConfig: {
                    type: "text",
                    placeholder: "Your Name"
                }
            },
            street: {
                inputType: "input",
                value: "",
                valid: false,
                touched: false,
                valitation: {
                    isRequired: true,
                },
                validationMessage: "Street is required!!!",
                inputConfig: {
                    type: "text",
                    placeholder: "Street"
                }
            },
            country: {
                inputType: "input",
                value: "",
                valid: false,
                touched: false,
                valitation: {
                    isRequired: true,
                },
                validationMessage: "Country is required!!!",
                inputConfig: {
                    type: "text",
                    placeholder: "Country"
                }
            },
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
                    placeholder: "Your E-mail"
                }
            },
            delivaryMethod: {
                inputType: "select",
                value: "fastest",
                valid: true,
                valitation: {},
                inputConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "medium", displayValue: "Medium" },
                        { value: "slow", displayValue: "Slow" },
                    ]
                }
            }
        },
        loading: false,
        isSubmitEnabled: false,
    }

    checkvalidity = (value, valitation) => {
        let isValidValue = true
        if (valitation.isRequired) {
            isValidValue = value.trim() !== "" && isValidValue;
        }

        return isValidValue;
    }

    inputChangeHandler = (event, inputName) => {

        const updatedFormOrder = {
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedFormOrder[inputName] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkvalidity(updatedFormElement.value, updatedFormElement.valitation);

        updatedFormOrder[inputName] = updatedFormElement;

        let isSubmitEnabled = true;
        for (let key in updatedFormOrder) {
            isSubmitEnabled = updatedFormOrder[key].valid === true && isSubmitEnabled
        }

        this.setState({ orderForm: updatedFormOrder, isSubmitEnabled: isSubmitEnabled })
    }

    orderhandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            name: this.state.orderForm.name.value,
            street: this.state.orderForm.street.value,
            country: this.state.orderForm.country.value,
            email: this.state.orderForm.email.value,
            delivaryMethod: this.state.orderForm.delivaryMethod.value,
            date: new Date().toDateString()
        }

        axios.post(`/order/${this.context.userId}.json?auth=${this.context.token}`, order)
            .then(response => {
                this.setState({
                    loading: false
                })
                this.props.history.push("/")
            }).catch(error => {
                this.setState({ loading: false })
            })

    }


    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({ inputName: key, ...this.state.orderForm[key] })
        }
        let form = (
            <form onSubmit={this.orderhandler}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.inputName}
                        inputType={formElement.inputType}
                        inputConfig={formElement.inputConfig}
                        value={formElement.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.inputName)}
                        isValid={formElement.valid}
                        isTouched={formElement.touched}
                        validationMessage={<p>{formElement.validationMessage}</p>}
                    />))}
                <Button btnType="Success" clicked={this.orderhandler} disabled={!this.state.isSubmitEnabled}> Submit Order </Button>
            </form>);

        if (this.state.loading === true) {
            form = <Spinner />
        }

        return (
            <div className="ContactData">
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }

}

export default withError(ContactData, axios)