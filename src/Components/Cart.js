import React, { useContext } from 'react'
import cartContext from '../store/cart-context'
import Amount from './Amount'
import Backdrop from './BackDrop'
import styles from './Cart.module.css'
import CartItems from './CartItems'

function Cart(props) {
  const ctx = useContext(cartContext)
  return <React.Fragment>
    <Backdrop />
    <div className={styles['cart-container']}>
      <h2>Cart Items</h2>
      <CartItems items={ctx.items} />
      <div className={styles['grand-total']}>
        <p>Total Amount</p>
        <Amount currency='$' amount={ctx.totalAmount} />
      </div>
      <div className={styles['cart-actions']}>
        <button onClick={props.onClose} className={styles['btn-close']}>Close</button>
        <button className={styles['btn-order']}>Order</button>
      </div>
    </div>
  </React.Fragment>
}

export default Cart