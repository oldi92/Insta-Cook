import * as actionTypes from "./actionTypes";

const initialState = {
  loader: false,
  vegetablesIngredients: [],
  meatIngredients: [],
  otherIngredients: [],
  ingredientSelected: [],
  recipes: [],
  recipesFiltered: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VEGETABLES_BEGIN:
      return {
        ...state,
        loader: true,
        error: false,
      };
    case actionTypes.FETCH_VEGETABLES_SUCCESS:
      return {
        ...state,
        loader: false,
        vegetablesIngredients: action.data,
      };
    case actionTypes.FETCH_VEGETABLES_FAILURE:
      return {
        ...state,
        loader: false,
        error: true,
      };
    case actionTypes.FETCH_MEAT_BEGIN:
      return {
        ...state,
        loader: true,
        error: false,
      };
    case actionTypes.FETCH_MEAT_SUCCESS:
      return {
        ...state,
        loader: false,
        meatIngredients: action.data,
      };
    case actionTypes.FETCH_MEAT_FAILURE:
      return {
        ...state,
        loader: false,
        error: true,
      };
    case actionTypes.FETCH_OTHER_BEGIN:
      return {
        ...state,
        loader: true,
        error: false,
      };
    case actionTypes.FETCH_OTHER_SUCCESS:
      return {
        ...state,
        loader: false,
        otherIngredients: action.data,
      };
    case actionTypes.FETCH_OTHER_FAILURE:
      return {
        ...state,
        loader: false,
        error: true,
      };
    case actionTypes.INGREDIENT_ADD:
      console.log(action.ingredient);
      return {
        ...state,
        ingredientSelected: state.ingredientSelected.concat(action.ingredient),
      };
    case actionTypes.INGREDIENT_REMOVE:
      console.log(action.ingredient);
      return {
        ...state,
        ingredientSelected: state.ingredientSelected.filter(
          (element) => element !== action.ingredient
        ),
      };
    case actionTypes.FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.recipes,
      };
    case actionTypes.FETCH_RECIPES_FAILURE:
      return {
        ...state,
        error: true,
      };
    case actionTypes.RECIPE_FILTER_SUCCESS:
      return {
        ...state,
        recipesFiltered: action.recipesFiltered,
      };
    default:
      return state;
  }
};

export default reducer;
