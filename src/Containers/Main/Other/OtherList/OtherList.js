import React from "react";
import { connect } from "react-redux";

import classes from "../../../../assets/style/Main.module.scss";
import * as actions from "../../../../store/actions";

const OtherList = (props) => {
  return props.list.map((element) => {
    const image = require(`../../../../assets/ingredients/otherIngredients/${element}.png`);
    const filtered = props.ingredientSelected.filter(
      (ingredient) => ingredient === element
    );
    return (
      <button
        disabled={
          filtered.length === 0
            ? false
            : filtered.map((ingredient) => ingredient === element)
        }
        onClick={() => props.onIngredientAdd(element)}
        className={classes.ingredientList}
        key={element}
      >
        <img src={image} alt="vegetables" />
        <br />
        {element}
      </button>
    );
  });
};
const mapStateToProps = (state) => {
  return {
    ingredientSelected: state.ingredientSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingredient) =>
      dispatch(actions.ingredientAdd(ingredient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherList);
