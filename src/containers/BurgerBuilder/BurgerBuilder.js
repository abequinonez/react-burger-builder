import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 1,
  cheese: 0.5,
  meat: 1.5
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4
    };
  }

  addIngredientHandler = type => {
    // Get the old count in order to calculate the updated count
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    // Make a copy of the original ingredients object
    const updatedIngredients = { ...this.state.ingredients };

    /*
    Assign the updated count to the specific property (type) in the new
    ingredients object.
    */
    updatedIngredients[type] = updatedCount;

    // Get the ingredient's added price
    const addedPrice = INGREDIENT_PRICES[type];

    // Get the old total price in order to calculate the new total price
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + addedPrice;

    // Update the state with the new values
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotalPrice
    });
  };

  removeIngredientHandler = type => {};

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls addIngredient={this.addIngredientHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
