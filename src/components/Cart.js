import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    console.log('Order', order);
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>

              {this.state.showCheckout && (
                <div className="checkout-form-main">
                    <hr></hr>
                    <h4 style={{textAlign: "center"}}>Checkout Form</h4>
                  <form onSubmit={this.createOrder}>
                    <ul>
                      <li>
                        <input
                          name="email"
                          type="email"
                          placeholder="Please enter your Email"
                          required
                          className="checkout-form"
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <input
                          name="name"
                          placeholder="Please enter your Name"
                          type="text"
                          required
                          className="checkout-form"
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <input
                          name="address"
                          type="text"
                          placeholder="Please enter your Address"
                          required
                          className="checkout-form"
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary checkout-form" type="submit" >
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}