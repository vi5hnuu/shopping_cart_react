import './App.css';
import React, { useContext } from 'react';
import Header from './Components/Header';
import heroImage from './assets/hero_image.jpg'
import Recipies from './Components/Recipies';
import cartContext from './store/cart-context';
import { initializeApp } from "firebase/app";
import stockContext from './store/stock-context';

//////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyBBFm1EjMoLuomavxPqdoxT3aHeupVnWJ8",
  authDomain: "shop-mart-a77ed.firebaseapp.com",
  projectId: "shop-mart-a77ed",
  storageBucket: "shop-mart-a77ed.appspot.com",
  messagingSenderId: "381970593301",
  appId: "1:381970593301:web:2c50cd4993736520f2401c"
};
initializeApp(firebaseConfig);
/////////////////////////

function App() {
  const cartctx = useContext(cartContext)
  const stockctx = useContext(stockContext)



  return (
    <React.Fragment>
      <Header count={cartctx.items.length} />
      <div className='hero-container'>
        <div className='hero-image-container'>
          <img src={heroImage} alt='hero' />
        </div>
        <div className='hero-intro'>
          <h2>Delicious Food, Delivered To You</h2>
          <p>Choose your meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
          <p>All our meals are cooked with high quality ingredients, Just-in-time and of course by experienced chefs!</p>
        </div>
      </div>
      <section className='recipe-container'>
        <h3 className='recipe-container_title'>
          Delicious Food
        </h3>
        <Recipies recipies={stockctx.items} />
      </section>
      <footer>
        &copy; copyright 2023 (vishnu kumar)
      </footer>
    </React.Fragment>
  );
}

export default App;
