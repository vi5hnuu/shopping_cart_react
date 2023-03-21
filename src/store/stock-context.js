import React from "react";

const stockContext = React.createContext({
  items: [],
  addItem: (item) => { },
})
stockContext.displayName = 'stock-provider'
export default stockContext;