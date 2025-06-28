/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const myCustomReduxLogger =
  (store: any) => (next: any) => (action: any) => {
    console.log(store);
    next(action);
  };
