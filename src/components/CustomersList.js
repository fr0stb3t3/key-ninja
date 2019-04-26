import React from "react";
import Customer from "./Customer";

const customerList = props => {
  const customers = props.customers.map((customer, i) => {
    return (
      <li key={customer.email}>
        <span onClick={() => props.edit(i)}>
          <Customer
            firstName={customer.firstName}
            email={customer.email}
            lastName={customer.lastName}
          />
        </span>
        <button onClick={() => props.delete(i)}>Delete</button>
      </li>
    );
  });
  const custList = <ul>{customers}</ul>;
  return custList;
};

export default customerList;
