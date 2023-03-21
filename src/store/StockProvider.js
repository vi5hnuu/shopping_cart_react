import { useEffect, useReducer } from "react";
import stockContext from "./stock-context";

//////////////////////////////
import { getDatabase, ref, onChildAdded } from "firebase/database";
//////////////////////////////
const defaultState = {
  items: []
}
function stockReducer(pState, action) {
  if (action.type === 'ADD') {
    const sItems = [...pState.items]

    const exists = sItems.find(item => item.id === action.item.id)
    //useless as firebase do not have duplicates but if it had then it wrong...
    if (exists) {
      // console.log("duplicate");
    } else {
      sItems.push(action.item)
    }
    return { items: sItems }
  }
  return defaultState
}

function StockProvider(props) {
  const [state, dispatchAction] = useReducer(stockReducer, defaultState)

  //https://firebase.google.com/docs/database/web/lists-of-data
  useEffect(() => {
    const db = getDatabase();
    const stockItemsRef = ref(db, 'stockItems');
    onChildAdded(stockItemsRef, (item_snapshot) => {
      const item = { ...item_snapshot.val(), id: item_snapshot.key }
      console.log('Added new Item...');
      dispatchAction({ type: 'ADD', item })
    });
  }, [])

  function addToStockHandler(item) {
    dispatchAction({ type: 'ADD', item })
  }

  const stock = {
    items: state.items,
    addItem: addToStockHandler,
  }
  return <stockContext.Provider value={stock}>
    {props.children}
  </stockContext.Provider>
}
export default StockProvider;