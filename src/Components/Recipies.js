import styles from './Recipies.module.css'
import RecipeItem from './RecipeItem';


function Recipies(props) {
  return <ul className={styles['recipe-list']}>
    {props.recipies.map(recipe => <RecipeItem key={recipe.id} id={recipe.id} name={recipe.name} discription={recipe.description} price={recipe.price} />)}
  </ul>
}

export default Recipies;