import React, { useContext, useState, CSSProperties } from 'react'
import cartContext from '../store/cart-context'
import Amount from './Amount'
import Backdrop from './BackDrop'
import styles from './Cart.module.css'
import CartItems from './CartItems'
import { getDatabase, ref, set, push } from "firebase/database";
import CheckoutForm from './CheckoutForm'
import { ClipLoader } from 'react-spinners'

function Cart(props) {
  const ctx = useContext(cartContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function checkoutFormVisibilityHandler() {
    setIsCheckingOut(true)
  }

  async function checkOutHandler({ name, email, address, pCode }) {
    const order = { customer: { name, email, address, pCode }, items: ctx.items }
    setIsLoading(true)
    await new Promise(async (resolve, reject) => {
      const db = getDatabase();
      await new Promise((res, rej) => {
        setTimeout(() => {//false wait time to see effect...[obv... more data will do this by default]
          res()
        }, 3000);
      })
      const ordersRef = ref(db, 'orders');
      const newOrder = push(ordersRef);
      set(newOrder, order);
      resolve()
    })
    ctx.clearCart()
    setIsLoading(false);
    setIsCheckingOut(false)
  }
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return <React.Fragment>
    <Backdrop />
    <div className={styles['cart-container']}>
      <h2>Cart Items</h2>
      <ClipLoader
        color='#2d6a4f'
        loading={isLoading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {!isLoading && <>
        <CartItems items={ctx.items} />
        <div className={styles['grand-total']}>
          <p>Total Amount</p>
          <Amount currency='$' amount={ctx.totalAmount} />
        </div>
        {!isCheckingOut && <div className={styles['cart-actions']}>
          <button onClick={props.onClose} className={styles['btn-close']}>Close</button>
          {ctx.items.length > 0 && <button onClick={checkoutFormVisibilityHandler} className={styles['btn-order']}>Order</button>}
        </div>}
        {isCheckingOut && <CheckoutForm onCheckOut={checkOutHandler} onCancel={props.onClose} />}
      </>}
    </div>
  </React.Fragment>
}

export default Cart