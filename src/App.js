import React from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { connect } from 'react-redux';

class App extends React.Component {

  createOrder = (order) => {
    alert("Order for " + order.name + " can be viewed in logs");
  };
  
  render() {
    return (
      <div className="grid-container">
        <main>
          <div className="content">
            <div className="main">
              <h2 style={{textAlign: "center"}}>Product List</h2>
              <Products
                products={this.props.prd}
                addToCart={this.props.onAddToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.props.ci}
                removeFromCart={this.props.onRemoveFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prd: state.products,
    ci: state.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (product) => dispatch({type: "ON_ADD_TO_CART" , payload: {product}}),
    onRemoveFromCart: (product) => dispatch({type: "ON_REMOVE_FROM_CART", payload: {product}})
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);