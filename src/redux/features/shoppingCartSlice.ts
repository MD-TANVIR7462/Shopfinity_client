import { createSlice } from '@reduxjs/toolkit';
import { shoppingCartInitialState } from '../initialStates';
import { RootState } from '../store';

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: shoppingCartInitialState,
  reducers: {
    setCartProductsInLocalState: (state, action) => {
      const cartProduct = action.payload;
      //check if the product is already in the cart
      const isProductAlreadyInTheCart = state.cartProducts.some(
        (product) => product._id === cartProduct._id
      );
      if (isProductAlreadyInTheCart) {
        state.cartProducts = state.cartProducts.filter(
          (product) => product._id !== cartProduct._id
        );
      } else {
        state.cartProducts = [...state.cartProducts, cartProduct];
      }
    },
    RemoveCartProductFromLocalState: (state, action) => {
      const cartProduct = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product?._id !== cartProduct?._id
      );
    },

    MakeShoppingCartEmpty: (state) => {
      state.cartProducts = [];
    },
  },
});

export const {
  setCartProductsInLocalState,
  RemoveCartProductFromLocalState,
  MakeShoppingCartEmpty,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

export const useShoppingCartProducts = (state: RootState) =>
  state.shoppingCart.cartProducts;
