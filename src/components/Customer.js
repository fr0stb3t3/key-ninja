import React from "react";

const customer = props => {
  return (
    <div>
      Customer: {props.firstName} {props.lastName} , Email: {props.email}{" "}
    </div>
  );
};

export default customer;
