import axios from "axios";
import * as actionTypes from "./actionTypes";
import app from "../firebase/Config";

/** fetch vegeterian ingredients start */
export const fetchVegetablesBegin = () => {
  return {
    type: actionTypes.FETCH_VEGETABLES_BEGIN,
  };
};

/**fetch vegeterian ingredients if they Succses */
export const fetchVegetablesSuccess = (fetchedData) => {
  return {
    type: actionTypes.FETCH_VEGETABLES_SUCCESS,
    data: fetchedData,
  };
};

//**fetch vegeterian ingredients if they failure */
export const fetchVegetablesFailure = () => {
  return {
    type: actionTypes.FETCH_VEGETABLES_FAILURE,
  };
};

/**featch vegeterian ingredients call from the vegetables component */
export const fetchVegetables = () => {
  return (dispatch) => {
    dispatch(fetchVegetablesBegin());
    axios
      .get("https://instant-cook.firebaseio.com/ingredients/vegetables.json")
      .then((response) => {
        const dataJsonToArray = Object.keys(response.data).map((key, value) => {
          return response.data[key];
        });
        dispatch(fetchVegetablesSuccess(dataJsonToArray));
      })
      .catch((error) => dispatch(fetchVegetablesFailure()));
  };
};

/** fetch meat ingredients start */
export const fetchMeatBegin = () => {
  return {
    type: actionTypes.FETCH_MEAT_BEGIN,
  };
};

/**fetch meat ingredients if they Succses */
export const fetchMeatSuccess = (fetchedData) => {
  return {
    type: actionTypes.FETCH_MEAT_SUCCESS,
    data: fetchedData,
  };
};

//**fetch meat ingredients if they failure */
export const fetchMeatFailure = () => {
  return {
    type: actionTypes.FETCH_MEAT_FAILURE,
  };
};

/**featch meat ingredients call from the vegetables component */
export const fetchMeat = () => {
  return (dispatch) => {
    dispatch(fetchMeatBegin());
    axios
      .get("https://instant-cook.firebaseio.com/ingredients/meat.json")
      .then((response) => {
        const dataJsonToArray = Object.keys(response.data).map((key, value) => {
          return response.data[key];
        });
        dispatch(fetchMeatSuccess(dataJsonToArray));
      })
      .catch((error) => dispatch(fetchMeatFailure()));
  };
};

/** fetch other ingredients start */
export const fetchOtherBegin = () => {
  return {
    type: actionTypes.FETCH_OTHER_BEGIN,
  };
};

/**fetch other ingredients if they Succses */
export const fetchOtherSuccess = (fetchedData) => {
  return {
    type: actionTypes.FETCH_OTHER_SUCCESS,
    data: fetchedData,
  };
};

//**fetch other ingredients if they failure */
export const fetchOtherFailure = () => {
  return {
    type: actionTypes.FETCH_OTHER_FAILURE,
  };
};

/**featch other ingredients call from the vegetables component */
export const fetchOther = () => {
  return (dispatch) => {
    dispatch(fetchOtherBegin());
    axios
      .get("https://instant-cook.firebaseio.com/ingredients/other.json")
      .then((response) => {
        const dataJsonToArray = Object.keys(response.data).map((key, value) => {
          return response.data[key];
        });
        dispatch(fetchOtherSuccess(dataJsonToArray));
      })
      .catch((error) => dispatch(fetchOtherFailure()));
  };
};

//**on click ingredient selected add */
export const ingredientAdd = (ingredient) => {
  return {
    type: actionTypes.INGREDIENT_ADD,
    ingredient: ingredient,
  };
};

//**on click ingredient selected removed */
export const ingredientRemove = (ingredient) => {
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    ingredient: ingredient,
  };
};

/**fetch on Success recipes from the users chosen ingredients  */
export const fetchRecipesSuccess = (recipes) => {
  return {
    type: actionTypes.FETCH_RECIPES_SUCCESS,
    recipes: recipes,
  };
};

/**fetch on failure recipes from the users chosen ingredients  */
export const fetchRecipesFailure = () => {
  return {
    type: actionTypes.FETCH_RECIPES_FAILURE,
  };
};

/**fetch recipes from server  */
let database = app.database().ref("recipes");

export const fetchRecipes = (ingredients) => {
  return (dispatch) => {
    database.on("value", (snap) => {
      console.log(snap.val());
      const dataJsonToArray = Object.keys(snap.val()).map((key, value) => {
        return snap.val()[key];
      });
      dispatch(fetchRecipesSuccess(dataJsonToArray));
      dispatch(recipeFilter(ingredients, dataJsonToArray));
    });
  };
};

/**fetch on failure recipes from the users chosen ingredients  */
export const recipeFilterSuccess = (recipesFiltered) => {
  return {
    type: actionTypes.RECIPE_FILTER_SUCCESS,
    recipesFiltered: recipesFiltered,
  };
};

/**recipes filter from the users chosen ingredients  */
export const recipeFilter = (ingredientsSelected, recipes) => {
  return (dispatch) => {
    //we join the array of ingredients selected from user
    const ingredientFiltered = ingredientsSelected.join(" ").toLowerCase();
    console.log("[ACTION]", ingredientFiltered);
    console.log("[ACTION RECIPES]", recipes);

    // we filter the recipes from the ingredients user chose
    const recipesFiltered = recipes.filter((element) =>
      element.ingredients.includes(ingredientFiltered)
    );

    //we pass the filtered recipes array to reducer
    dispatch(recipeFilterSuccess(recipesFiltered));
    console.log("[ACTION]", recipesFiltered);
  };
};

/**change the toggle variable on reducer for the menu slide in and out */
export const toggleMenu = () => {
  return {
    type: actionTypes.TOGGLE_MENU,
  };
};

/**change the toggle variable on reducer for the menu slide in and out */
export const toggleMenuOpen = () => {
  return {
    type: actionTypes.TOGGLE_MENU_OPEN,
  };
};

/**this pass the data from dashboard to the preview recipe component throw redux */
export const recipePreviewDataPass = (recipe) => {
  return {
    type: actionTypes.RECIPE_PREVIEW_DATA_PASS,
    recipe: [recipe],
  };
};
