import React from "react";

const editCustomer = props => {
  return (
    <div>
      <div>
        FirstName:
        <input
          type="text"
          onChange={e => props.onChangeField("firstName", "edit", e)}
          value={props.textValues.firstName}
        />
        LastName:
        <input
          type="text"
          onChange={e => props.onChangeField("lastName", "edit", e)}
          value={props.textValues.lastName}
        />
        Email:
        <input
          type="text"
          onChange={e => props.onChangeField("email", "edit", e)}
          value={props.textValues.email}
        />
      </div>
      <div>
        <button
          onClick={e =>
            props.edit(
              props.textValues.firstName,
              props.textValues.lastName,
              props.textValues.email
            )
          }
        >
          Edit Customer
        </button>
        <button onClick={props.back}>Cancel</button>
      </div>
    </div>
  );
};

export default editCustomer;
