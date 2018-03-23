import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
    const ingValue = props.ingredients[ingKey];
    return (
      <li key={ingKey}>
        {ingKey[0].toUpperCase() + ingKey.slice(1)}: {ingValue}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Order Summary</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.hideOrder}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueToCheckout}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default orderSummary;
