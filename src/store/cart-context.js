import React from "react";

const cartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => { },
  removeItem: (id, times) => { }
})
cartContext.displayName = 'Cart-provider'

export default cartContext;