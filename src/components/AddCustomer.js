import React from "react";

const addCustomer = props => {
  return (
    <div>
      <div>
        FirstName:
        <input
          type="text"
          onChange={e => props.onChangeField("firstName", "add", e)}
          value={props.textValues.firstName}
        />
        LastName:
        <input
          type="text"
          onChange={e => props.onChangeField("lastName", "add", e)}
          value={props.textValues.lastName}
        />
        Email:
        <input
          type="text"
          onChange={e => props.onChangeField("email", "add", e)}
          value={props.textValues.email}
        />
      </div>
      <div>
        <button onClick={props.click}>Add Customer</button>
      </div>
    </div>
  );
};

export default addCustomer;
