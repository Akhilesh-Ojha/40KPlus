import data from "../data.json";

const initialState = {
    products: data.products,
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
}

const reducer = (state=initialState, action) => {
    if(action.type === 'ON_ADD_TO_CART') {
        const cartItems = state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item._id === action.payload.product._id) {
            item.count++;
            alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            cartItems.push({ ...action.payload.product, count: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return {
            products: data.products,
            cartItems: cartItems
        };
    } else if (action.type === 'ON_REMOVE_FROM_CART') {
        const cartItems = state.cartItems.slice();
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems.filter((x) => x._id !== action.payload.product._id))
        );
        return {
            products: data.products,
            cartItems: cartItems.filter((x) => x._id !== action.payload.product._id),
        }
    }
    return state
}

export default reducer;