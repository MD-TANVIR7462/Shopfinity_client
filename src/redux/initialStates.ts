import {
  TAuthInitialState,
  TPayment,
  TShoppingCartInitialState,
  TWishListInitialState,
} from '../types/commonTypes';

export const authInitialState: TAuthInitialState = {
  user: null,
  token: null,
};

export const wishListInitialState: TWishListInitialState = {
  wishedProducts: [],
};

export const shoppingCartInitialState: TShoppingCartInitialState = {
  cartProducts: [],
};

export const paymentInitialState: TPayment = {
  cartProducts: [],
  appliedCoupon: '',
  discount: 0,
  subtotal: 0,
  totalToBePaid: 0,
};
