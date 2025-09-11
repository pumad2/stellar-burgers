import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/indredientsSelectors';
import { useLocation, useParams } from 'react-router-dom';
import styles from '../ui/modal/modal.module.css';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id) || null,
    [ingredients, id]
  );
  const location = useLocation();
  const isModal = !!location.state?.background;

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {!isModal && (
        <h3
          style={{ textAlign: 'center' }}
          className={`${styles.title} text text_type_main-large`}
        >
          Детали ингредиента
        </h3>
      )}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
