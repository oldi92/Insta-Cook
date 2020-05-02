import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import classes from "../../../assets/style/Main.module.scss";
import { Spinner } from "react-bootstrap";
import IngredientGen from "../../../Components/ingredientsGen/IngredientGen";

class Vegetables extends Component {
  componentDidMount() {
    if (this.props.vegetablesIngredients.length === 0) {
      console.log("inside vegetables");
      this.props.onFetchVegetables();
    }
  }

  render() {
    let vegetablesProps = {
      imagePath: "vegetables",
      name: "vegetablesIngredients",
      value: this.props.vegetablesIngredients,
    };

    let ingredientsSelectedDiv = [];
    ingredientsSelectedDiv = this.props.ingredientSelected.map((element) => (
      <div>{element}</div>
    ));

    return (
      <div className={classes.Container}>
        <div className={classes.options}>
          <div className={classes.title}>
            <span className={classes.titleHello}>Choose</span>, your Vegetables.
            <br />
            <button
              onClick={() => this.props.history.push("/")}
              className={classes.vegetablesBack}
            >
              Back
            </button>
          </div>
          <div className={classes.ingredients}>
            {this.props.loader ? (
              <Spinner
                style={{ marginLeft: "47%", marginTop: "5rem" }}
                animation="border"
                role="status"
              >
                <span className="sr-only ">Loading...</span>
              </Spinner>
            ) : (
              <IngredientGen ingredients={vegetablesProps} />
            )}
          </div>
          <div className={classes.ingredientsSelected}>
            {ingredientsSelectedDiv}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    vegetablesIngredients: state.vegetablesIngredients,
    error: state.error,
    ingredientSelected: state.ingredientSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVegetables: () => dispatch(actions.fetchVegetables()),
    oningredientRemove: (element) =>
      dispatch(actions.ingredientRemove(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vegetables);
