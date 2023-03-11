import './App.css';
import React, { useContext } from 'react';
import Header from './Components/Header';
import heroImage from './assets/hero_image.jpg'
import Recipies from './Components/Recipies';
import cartContext from './store/cart-context';

const dummy_recipies = [{
  id: 'm1',
  name: 'Sushi',
  description: 'Finest fish and veggies',
  price: 22.99,
},
{
  id: 'm2',
  name: 'Schnitzel',
  description: 'A german specialty!',
  price: 16,
},
{
  id: 'm3',
  name: 'Barbecue Burger',
  description: 'American, raw, meaty',
  price: 12.99,
},
{
  id: 'm4',
  name: 'Green Bowl',
  description: 'Healthy...and green...',
  price: 18.99,
}]
function App() {
  const ctx = useContext(cartContext)

  return (
    <React.Fragment>
      <Header count={ctx.items.length} />
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
        <Recipies recipies={dummy_recipies} />
      </section>
      <footer>
        &copy; copyright 2023 (vishnu kumar)
      </footer>
    </React.Fragment>
  );
}

export default App;
