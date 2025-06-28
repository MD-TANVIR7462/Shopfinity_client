import { createSlice } from '@reduxjs/toolkit';
import { wishListInitialState } from '../initialStates';
import { RootState } from '../store';

const wishListSlice = createSlice({
  name: 'wishList',
  initialState: wishListInitialState,
  reducers: {
    setWishedProductsInLocalState: (state, action) => {
      const wishedProduct = action.payload;
      //check if the product is already in the list
      const isProductAlreadyInList = state.wishedProducts.some(
        (product) => product._id === wishedProduct._id
      );
      if (isProductAlreadyInList) {
        state.wishedProducts = state.wishedProducts.filter(
          (product) => product._id !== wishedProduct._id
        );
      } else {
        state.wishedProducts = [...state.wishedProducts, wishedProduct];
      }
    },
    RemoveWishedProductFromLocalState: (state, action) => {
      const wishedProduct = action.payload;
      state.wishedProducts = state.wishedProducts.filter(
        (product) => product?._id !== wishedProduct?._id
      );
    },
  },
});

export const {
  setWishedProductsInLocalState,
  RemoveWishedProductFromLocalState,
} = wishListSlice.actions;
export default wishListSlice.reducer;

export const useWishedProducts = (state: RootState) =>
  state.wishList.wishedProducts;
