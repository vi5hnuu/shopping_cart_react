import React from 'react'
import styles from './CheckoutForm.module.css'


export default function CheckoutForm() {
  return <form className={styles['checkout-form']}>
    <div className={styles['form-control']}>
      <label htmlFor='name'>Name :</label>
      <input id='name' type='text' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='email'>Email :</label>
      <input id='email' type='email' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='postal-code'>Postal Code :</label>
      <input id='postal-code' type='number' maxLength='6' />
    </div>
    <div className={styles['form-control']}>
      <label htmlFor='address'>Address :</label>
      <textarea id='address' />
    </div>
    <div className={styles['form-actions']}>
      <button className={styles['btn-cancel']} type='button'>Cancel</button>
      <button className={styles['btn-confirm']} type='submit'>Confirm</button>
    </div>
  </form>
}
