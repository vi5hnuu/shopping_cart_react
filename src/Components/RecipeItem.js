import styles from './RecipeItem.module.css'

function RecipeItem(props) {
  return <li className={styles['recipe-item']}>
    <div className={styles['recipe-detail']}>
      <h3>{props.name}</h3>
      <p className={styles['recipe-discription']}>{props.discription}</p>
      <p className={styles['recipe-price']}>
        <span className={styles['recipe-price-currency']}>$</span>
        <span className={styles['recipe-price-amount']}>{props.price.toFixed(2)}</span>
      </p>
    </div>
    <div className={styles['recipe-action_container']}>
      <div className={styles['recipe-control']}>
        <span>Amount</span>
        <input type="number" min='1' />
      </div>
      <div className={styles['recipe-actions']}>
        <button className={styles['btn-sub']}>-</button>
        <button className={styles['btn-add']}>+</button>
      </div>
    </div>
  </li>
}
export default RecipeItem;