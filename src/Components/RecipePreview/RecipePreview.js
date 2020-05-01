import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "../../Hoc/Layout/Layout";
import classes from "../../assets/style/RecipePreview.module.scss";
import servesImage from "../../assets/images/serves.png";
import ingredientsImage from "../../assets/images/ingredients.png";
import gravyImage from "../../assets/images/gravy.png";
import preperationImage from "../../assets/images/preperation.png";
import methodImage from "../../assets/images/method.png";
import CookingImage from "../../assets/images/cooking-time.png";
import Auxiliary from "../../Hoc/Auxiliary/Auxiliary";
import { Redirect } from "react-router";

class RecipePreview extends Component {
  componentDidMount() {
    console.log("RECIPE PREVIEW COMPONENT DID MOUNT");
    // this.props.onfetchRecipes(this.props.ingredientSelected);
    this.widthHanlder(window.screen.availWidth);
  }

  widthHanlder = (screenWidth) => {
    if (screenWidth > 992) {
      this.setState({ width: "desktop", toggle: true });
    }
  };
  render() {
    let recipePreviewDiv = "";
    if (this.props.recipePreview) {
      recipePreviewDiv = this.props.recipePreview.map((element) => {
        const ingredientsList = element.ingredientsList.map((list) => (
          <li key={list}>{list}</li>
        ));
        let gravyList;
        if (element.gravy) {
          gravyList = element.gravy.map((list) => <li key={list}>{list}</li>);
        } else {
          gravyList = null;
        }
        return (
          <div key={element.title} className={classes.recipePreview}>
            <div className={classes.title}>{element.title}</div>

            <div className={classes.infoAndImage}>
              <img src={element.img} alt="recipe" />
              <div className={classes.info}>
                <div className={classes.infoCol}>
                  <div className={classes.infoColImage}>
                    <img src={preperationImage} alt="preperation" />
                  </div>
                  <div className={classes.infoColText}>
                    Preperation time
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      {element.info.prepTime}
                    </span>
                  </div>
                </div>

                <div className={classes.infoCol}>
                  <div className={classes.infoColImage}>
                    <img src={CookingImage} alt="cokking-time" />
                  </div>
                  <div className={classes.infoColText}>
                    Cooking time
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      {element.info.cookTime}
                    </span>
                  </div>
                </div>

                <div className={classes.infoCol}>
                  <div className={classes.infoColImage}>
                    <img src={servesImage} alt="serves" />
                  </div>
                  <div className={classes.infoColText}>
                    Serves
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      {element.info.serves}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <ul className={classes.ingredients}>
              <h2>
                <img src={ingredientsImage} alt="ingredients" /> Ingredients
              </h2>
              {ingredientsList}
            </ul>

            <hr />
            {gravyList === null ? null : (
              <Auxiliary>
                <ul className={classes.ingredients}>
                  <h2>
                    <img src={gravyImage} alt="ingredients" /> Gravy
                  </h2>
                  {gravyList}
                </ul>
                <hr />
              </Auxiliary>
            )}
            <div className={classes.method}>
              <h2>
                <img src={methodImage} alt="method" /> Method
              </h2>
              <p>{element.method}</p>
            </div>
          </div>
        );
      });
    }

    console.log("[RECIPE PREVIEW]", this.props.recipePreview);
    return (
      <Layout {...this.props}>
        {recipePreviewDiv.length > 0 ? (
          recipePreviewDiv
        ) : (
          <Redirect to="/search" />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipePreview: state.recipePreview,
  };
};

export default connect(mapStateToProps, null)(RecipePreview);
