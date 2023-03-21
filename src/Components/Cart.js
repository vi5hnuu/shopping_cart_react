import React, { useContext, useEffect } from 'react'
import cartContext from '../store/cart-context'
import Amount from './Amount'
import Backdrop from './BackDrop'
import styles from './Cart.module.css'
import CartItems from './CartItems'
import { getDatabase, ref, set, push, onValue, onChildAdded } from "firebase/database";
import CheckoutForm from './CheckoutForm'

const its = [
  {
    "name": "Yvonne",
    "description": "Officia non et consectetur dolor consectetur id est. Proident labore amet proident dolor qui sint duis. Dolore aliqua amet proident laboris irure duis ut duis tempor anim ea id.\r\nVoluptate do adipisicing id in eiusmod consequat magna nulla duis sit dolor. Cillum magna minim adipisicing aute nisi fugiat eu eiusmod ea in excepteur laboris officia duis. Qui incididunt eu pariatur nostrud quis anim aute cillum consequat occaecat. Esse ipsum laboris exercitation Lorem pariatur tempor quis cillum. Dolore minim in minim minim est mollit reprehenderit cillum eiusmod eiusmod sint quis aute.\r\nProident consequat commodo velit nulla qui irure labore laboris quis aliquip. Anim proident dolor esse duis dolor enim ad et laborum. Occaecat commodo magna exercitation aute eu nisi quis. Sit nisi dolore aute cillum eu excepteur velit reprehenderit velit laborum esse aute incididunt enim. Do aliquip dolore excepteur nisi qui proident enim deserunt cillum eu culpa sunt in nulla.\r\n",
    "price": 511
  },
  {
    "name": "Lamb",
    "description": "Esse deserunt excepteur enim officia ut. Fugiat ipsum aute et enim nulla laborum culpa culpa do deserunt aute. Culpa laboris sint occaecat ipsum velit consequat do et dolore incididunt.\r\nQui labore id ex ex esse mollit nostrud. Reprehenderit laborum aute ex commodo consequat laboris sunt officia aute veniam ea. Cupidatat anim ipsum nulla officia. Non in nulla irure ea sint tempor. Ullamco sint Lorem nulla enim adipisicing id est in occaecat. Aute elit officia duis Lorem amet sint deserunt ad aliquip.\r\nQuis consectetur occaecat anim exercitation ea ad veniam adipisicing incididunt enim. Aliquip eiusmod ut amet excepteur. Consectetur exercitation magna ut est ullamco irure. Voluptate laborum velit proident officia incididunt commodo enim velit minim. Enim ex tempor eiusmod ipsum ipsum ullamco quis ad aute mollit veniam consequat. Proident deserunt velit elit voluptate deserunt.\r\n",
    "price": 337
  },
  {
    "name": "Mcfadden",
    "description": "Nostrud laborum aliquip tempor est. Sint sit amet occaecat tempor eiusmod veniam ex consequat Lorem incididunt id excepteur. Mollit tempor aliquip do magna dolore eu laboris commodo Lorem magna commodo eiusmod officia. Enim tempor cupidatat veniam fugiat do aliquip. Excepteur veniam elit non anim voluptate qui dolore nostrud quis labore non. Qui et do amet minim ut in. Ullamco enim dolor in cupidatat sunt.\r\nLorem tempor qui quis amet minim. Et pariatur et magna irure incididunt excepteur ut dolor occaecat elit mollit sint cupidatat. Aute aliqua incididunt dolor fugiat consequat cupidatat ad amet in minim labore officia quis consequat. Sint quis laborum aliqua amet duis aliqua ad. Enim ipsum tempor anim labore velit. Esse officia cupidatat esse labore voluptate adipisicing exercitation quis ad. Reprehenderit mollit Lorem cillum irure quis cillum sit cillum in consectetur adipisicing.\r\nTempor amet veniam cillum ipsum amet esse incididunt excepteur laborum. Culpa velit esse irure aliquip aliqua exercitation aliqua deserunt. Do magna laborum deserunt cillum culpa excepteur.\r\n",
    "price": 403
  },
  {
    "name": "Dawn",
    "description": "Dolor in laborum pariatur ipsum officia. Excepteur nulla aliqua dolor et Lorem ad. Lorem Lorem voluptate cupidatat excepteur pariatur eiusmod. Ullamco ea labore deserunt nulla velit veniam labore nulla consequat. Sunt duis mollit elit quis nulla proident labore. Officia velit duis id elit aliquip mollit est non sint in consectetur. Deserunt est culpa occaecat occaecat.\r\nOfficia consequat cillum anim aliqua voluptate labore reprehenderit in commodo quis incididunt occaecat nisi tempor. Irure ipsum non magna nulla reprehenderit veniam. Et laborum voluptate reprehenderit ea nostrud mollit ex in. Amet dolor et labore non incididunt esse deserunt.\r\nLabore elit aliqua velit nisi eu. Sint labore aliquip ad ad. Veniam qui cupidatat nostrud sint adipisicing irure fugiat ex nisi cupidatat occaecat eiusmod amet non.\r\n",
    "price": 148
  },
  {
    "name": "Kelsey",
    "description": "Occaecat eiusmod do in id culpa ex anim. Id sunt anim dolore ea veniam dolor laborum in aliquip deserunt non et. Voluptate nulla nisi irure fugiat quis commodo eiusmod quis cillum cupidatat esse officia. Cillum tempor tempor cupidatat enim cupidatat.\r\nFugiat duis consectetur est Lorem pariatur. Proident ullamco exercitation laboris exercitation ullamco eu ad non nulla sint irure dolore. Occaecat laborum qui non magna veniam minim aliqua sunt tempor ex. Ad mollit in excepteur aliquip incididunt cillum. Nisi cillum aliqua ullamco commodo aute. Consectetur aute incididunt excepteur dolor veniam aliqua sunt.\r\nExcepteur nulla ut amet sint nulla cupidatat reprehenderit deserunt officia laboris Lorem adipisicing sint dolore. Adipisicing nostrud id enim amet consequat. Qui nulla cillum anim sint esse nostrud qui amet in est culpa nostrud exercitation.\r\n",
    "price": 624
  },
  {
    "name": "Banks",
    "description": "Non in occaecat reprehenderit culpa eu in dolore adipisicing. Minim ipsum Lorem incididunt amet sint. Quis non id minim occaecat sint nulla ex sit quis tempor tempor culpa dolor. Excepteur tempor minim in reprehenderit dolor consectetur cillum officia.\r\nAliqua commodo ad cillum cupidatat ex occaecat nulla. Nisi eu veniam excepteur non amet anim anim anim cupidatat in consectetur consectetur labore. Labore aliquip amet anim occaecat ullamco in anim laborum occaecat occaecat nulla non ullamco reprehenderit.\r\nAute exercitation aute minim officia laborum. Quis elit qui laborum anim cupidatat tempor anim do. Fugiat nulla eiusmod non nisi esse proident. Aliquip voluptate dolore fugiat reprehenderit amet quis eiusmod labore ad commodo nisi dolore. In officia in eu qui nisi ad pariatur fugiat ipsum mollit laboris eiusmod.\r\n",
    "price": 497
  }
]
function Cart(props) {
  const ctx = useContext(cartContext)

  useEffect(() => {
    const db = getDatabase();

    // onValue(ref(db, 'items'), (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });

    onChildAdded(ref(db, 'items'), (item) => {
      console.log(item.val());
    });
  }, [])
  async function demo() {

    const db = getDatabase();
    const itemsRef = ref(db, 'items');
    its.forEach(item => {
      const ni = push(itemsRef);
      set(ni, item);
    })
  }
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
        <button onClick={demo} className={styles['btn-order']}>Order</button>
      </div>
      {/* <CheckoutForm /> */}
    </div>
  </React.Fragment>
}

export default Cart