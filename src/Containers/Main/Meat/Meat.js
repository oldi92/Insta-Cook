import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import classes from "../../../assets/style/Main.module.scss";
import MeatList from "./MeatList/MeatList";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Meat extends Component {
  componentDidMount() {
    if (this.props.meatIngredients.length === 0) {
      console.log("inside MEAT");
      this.props.onFetchMeat();
    }
  }

  render() {
    console.log(this.props.meatIngredients);
    console.log(this.props.ingredientSelected);

    let meatDiv = [];
    if (this.props.meatIngredients) {
      meatDiv = <MeatList meatList={this.props.meatIngredients} />;
    }

    let ingredientSelectedDiv = [];
    if (this.props.ingredientSelected) {
      ingredientSelectedDiv = this.props.ingredientSelected.map((element) => (
        <button
          key={element}
          onClick={() => this.props.oningredientRemove(element)}
        >
          {element}
          <FontAwesomeIcon
            style={{ color: "#007bff", marginLeft: "0.5rem" }}
            icon={faTimes}
            size="1x"
          />
        </button>
      ));
    }

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
              meatDiv
            )}
          </div>
          <div className={classes.ingredientsSelected}>
            {ingredientSelectedDiv}
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
    error: state.error,
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
