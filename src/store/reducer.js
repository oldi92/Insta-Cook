import * as actionTypes from "./actionTypes";

const initialState = {
  toggle: false,
  loader: false,
  vegetablesIngredients: [],
  meatIngredients: [],
  otherIngredients: [],
  ingredientSelected: [],
  vegetablesSeleted: [],
  vegetablesSum: 0,
  meatSum: 0,
  otherSum: 0,
  recipes: [],
  recipesFiltered: [],
  error: false,
  recipePreview: [],
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
    case actionTypes.TOGGLE_MENU:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case actionTypes.TOGGLE_MENU_OPEN:
      return {
        ...state,
        toggle: true,
      };
    case actionTypes.RECIPE_PREVIEW_DATA_PASS:
      return {
        ...state,
        recipePreview: action.recipe,
      };
    case actionTypes.VEGETABLES_SUM_ADD:
      return {
        ...state,
        vegetablesSum: state.vegetablesSum + 1,
      };
    case actionTypes.MEAT_SUM_ADD:
      return {
        ...state,
        meatSum: state.meatSum + 1,
      };
    case actionTypes.OTHER_SUM_ADD:
      return {
        ...state,
        otherSum: state.otherSum + 1,
      };
    case actionTypes.VEGETABLES_SUM_REMOVE:
      return {
        ...state,
        vegetablesSum: state.vegetablesSum - 1,
      };
    case actionTypes.MEAT_SUM_REMOVE:
      return {
        ...state,
        meatSum: state.meatSum - 1,
      };
    case actionTypes.OTHER_SUM_REMOVE:
      return {
        ...state,
        otherSum: state.otherSum - 1,
      };
    default:
      return state;
  }
};

export default reducer;
