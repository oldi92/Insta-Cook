import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import classes from "../../../assets/style/Main.module.scss";
import { Spinner } from "react-bootstrap";
import IngredientGen from "../../../Components/ingredientsGen/IngredientGen";

class Meat extends Component {
  componentDidMount() {
    if (this.props.meatIngredients.length === 0) {
      console.log("inside MEAT");
      this.props.onFetchMeat();
    }
  }

  render() {
    let meatProps = {
      imagePath: "meatAndFish",
      name: "meatIngredients",
      value: this.props.meatIngredients,
    };
    let ingredientsSelectedDiv = [];
    ingredientsSelectedDiv = this.props.ingredientSelected.map((element) => (
      <div>{element}</div>
    ));

    return (
      <div className={classes.Container}>
        <div className={classes.options}>
          <div className={classes.title}>
            <span className={classes.titleHello}>Choose</span>, your Meat or
            Fish.
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
              <IngredientGen ingredients={meatProps} />
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
    meatIngredients: state.meatIngredients,
    ingredientSelected: state.ingredientSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMeat: () => dispatch(actions.fetchMeat()),
    oningredientRemove: (element) =>
      dispatch(actions.ingredientRemove(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meat);
