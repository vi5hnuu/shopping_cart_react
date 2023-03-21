import styles from './Recipies.module.css'
import RecipeItem from './RecipeItem';


function Recipies(props) {
  const recipies = props.recipies;

  return <ul className={styles['recipe-list']}>
    {recipies.length === 0 && <li className={styles['no-recipe']}>No Recipe Found.</li>}
    {recipies.length > 0 && recipies.map(recipe => <RecipeItem key={recipe.id} id={recipe.id} name={recipe.name} discription={recipe.description} price={recipe.price} />)}
  </ul>
}

export default Recipies;