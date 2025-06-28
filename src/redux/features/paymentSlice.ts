import { createSlice } from '@reduxjs/toolkit';
import { paymentInitialState } from '../initialStates';
import { RootState } from '../store';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: paymentInitialState,
  reducers: {
    CalculateAmountToBePaid: (state, action) => {
      state.cartProducts = action.payload.cartProducts;
      state.appliedCoupon = action.payload.appliedCoupon;
      state.discount = action.payload.discount;
      state.subtotal = action.payload.subtotal;
      state.totalToBePaid = action.payload.totalToBePaid;
    },
    ClearPaymentInfoAfterMakingOrder: (state) => {
      state.cartProducts = [];
      state.appliedCoupon = '';
      state.discount = 0;
      state.subtotal = 0;
      state.totalToBePaid = 0;
    },
  },
});

export const { CalculateAmountToBePaid, ClearPaymentInfoAfterMakingOrder } =
  paymentSlice.actions;
export default paymentSlice.reducer;

export const usePaymentCalculation = (state: RootState) => state.payment;
