import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
      totalPrice: 4,
      isPurchasable: false,
      viewOrder: false
    };
  }

  /*
  Set the isPurchasable state property to either true or false, depending on
  whether or not any of the ingredients in the ingredients state property have
  a value greater than 0. The value of isPurchasable will determine whether or
  not the order button should be disabled.
  */
  updatePurchaseState() {
    for (const ingKey in this.state.ingredients) {
      if (this.state.ingredients[ingKey] > 0) {
        return this.setState({ isPurchasable: true });
      }
    }
    this.setState({ isPurchasable: false });
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
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newTotalPrice
      },
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = type => {
    // Get the old count in order to calculate the updated count
    const oldCount = this.state.ingredients[type];

    // Only continue if the old count is greater than 0
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;

      // Make a copy of the original ingredients object
      const updatedIngredients = { ...this.state.ingredients };

      /*
      Assign the updated count to the specific property (type) in the new
      ingredients object.
      */
      updatedIngredients[type] = updatedCount;

      // Get the ingredient's deducted price
      const deductedPrice = INGREDIENT_PRICES[type];

      // Get the old total price in order to calculate the new total price
      const oldTotalPrice = this.state.totalPrice;
      const newTotalPrice = oldTotalPrice - deductedPrice;

      // Update the state with the new values
      this.setState(
        {
          ingredients: updatedIngredients,
          totalPrice: newTotalPrice
        },
        this.updatePurchaseState
      );
    }
  };

  viewOrderHandler = () => {
    this.setState({ viewOrder: true });
  };

  hideOrderHandler = () => {
    this.setState({ viewOrder: false });
  };

  continueToCheckoutHandler = () => {
    alert('Checkout coming soon!');
  };

  render() {
    /*
    Using the ingredients object as a template, create a new object that
    declares whether or not a key (ingredient/type) has a value (quantity) of 0.
    If so, that key will be assigned a value of true. Otherwise it will be
    assigned a value of false. This information will be passed down to
    subcomponents and used in determining whether or not an ingredient's 'Less'
    button should be disabled.
    */
    const disabledStatus = { ...this.state.ingredients };
    for (const ingKey in disabledStatus) {
      disabledStatus[ingKey] = disabledStatus[ingKey] <= 0;
    }

    return (
      <Fragment>
        <Modal show={this.state.viewOrder} hideOrder={this.hideOrderHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            hideOrder={this.hideOrderHandler}
            continueToCheckout={this.continueToCheckoutHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledStatus={disabledStatus}
          isPurchasable={this.state.isPurchasable}
          viewOrder={this.viewOrderHandler}
          price={this.state.totalPrice}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
