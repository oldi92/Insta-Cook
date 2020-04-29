import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import classes from "../../../assets/style/Main.module.scss";
import VegetableList from "./VegetablesList/VegetableList";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Vegetables extends Component {
  componentDidMount() {
    if (this.props.vegetablesIngredients.length === 0) {
      console.log("inside vegetables");
      this.props.onFetchVegetables();
    }
  }

  render() {
    let vegetablesDiv = [];
    if (this.props.vegetablesIngredients) {
      vegetablesDiv = (
        <VegetableList vegetableList={this.props.vegetablesIngredients} />
      );
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
              vegetablesDiv
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
