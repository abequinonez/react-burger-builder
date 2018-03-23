import React, { Fragment } from 'react';

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
    </Fragment>
  );
};

export default orderSummary;
