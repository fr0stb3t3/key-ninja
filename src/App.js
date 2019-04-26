import React, { Component } from "react";
import CustomerList from "./components/CustomersList";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      addCustomerData: { firstName: "", lastName: "", email: "" },
      editCustomerData: { firstName: "", lastName: "", email: "" },
      editCustomer: { edit: false, indexToEdit: null }
    };

    this.emailDictionary = {};
    for (let i = 0; i < this.state.customers.length; i++) {
      for (let key of Object.keys(this.state.customers[i])) {
        if (key === "email") {
          this.emailDictionary[
            this.state.customers[i][key]
          ] = this.state.customers[i];
        }
      }
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000").then(res => {
      const _customers = res.data;
      console.log(_customers);
      for (let i = 0; i < _customers.length; i++) {
        this.addEmailToDictionary(_customers[i]);
      }
      this.setState({ customers: _customers });
      console.log(res.data);
    });
  }

  addEmailToDictionary = customer => {
    if (customer.email in this.emailDictionary) {
      return false;
    } else {
      this.emailDictionary[customer.email] = customer;
      return true;
    }
  };

  checkIfEmailValid = customerData => {
    if (this.addEmailToDictionary(customerData)) {
      return true;
    } else {
      alert("EMAIL ADDRESS ALREADY IN USE, PLEASE PROVIDE A NEW ONE");
      return false;
    }
  };

  checkIfAnyEmpty = customerData => {
    for (let key of Object.keys(customerData)) {
      if (customerData[key] === "") {
        alert("ALL VALUES MUST BE FILLED , TRY AGAIN");
        return false;
      }
    }
    return true;
  };

  checkIfValid = customerData => {
    return (
      this.checkIfAnyEmpty(customerData) && this.checkIfEmailValid(customerData)
    );
  };

  addcustomerhandler = () => {
    // console.log(this.addCustomerData);
    if (!this.checkIfValid(this.state.addCustomerData)) {
      return false;
    } else {
      let customerData = this.state.customers;

      customerData.push({ ...this.state.addCustomerData });

      axios.post("http://localhost:5000", [this.state.addCustomerData, null]);

      this.setState({
        customers: customerData,
        addCustomerData: { firstName: "", lastName: "", email: "" }
      });

      return true;
    }
  };

  editcustomerhandler = (fname, lname, nemail) => {
    const ndx = this.state.editCustomer.indexToEdit;
    let prevStateCustomers = this.state.customers;
    let prevStateCustomer = prevStateCustomers[ndx];
    let prevEmail = prevStateCustomer.email;
    if (nemail !== prevEmail && nemail in this.emailDictionary) {
      alert("EMAIL ADDRESS ALREADY IN USE, PLEASE PROVIDE A NEW ONE");
      return false;
    } else if (fname === "" || lname === "" || nemail === "") {
      alert("ALL INPUT FIELDS MUST BE FILLED");
      return false;
    } else {
      delete this.emailDictionary[prevEmail];
      prevStateCustomer.firstName = fname;
      prevStateCustomer.lastName = lname;
      prevStateCustomer.email = nemail;

      axios.post("http://localhost:5000", [prevStateCustomer, ndx]);
      this.setState({ customer: prevStateCustomers });
      this.addEmailToDictionary(prevStateCustomer);
    }

    this.onBackHandler();
    return true;
  };

  nameHandler = (whichField, addOrEdit, e) => {
    let prevCustomerData;
    if (addOrEdit === "add") {
      prevCustomerData = { ...this.state.addCustomerData };
    } else if (addOrEdit === "edit") {
      prevCustomerData = { ...this.state.editCustomerData };
    } else {
      console.log(e, whichField, addOrEdit);
      throw new Error("error , neither add nor edit");
    }

    if (
      whichField === "firstName" ||
      whichField === "lastName" ||
      whichField === "email"
    ) {
      prevCustomerData[whichField] = e.target.value;
    } else {
      throw new Error("error, wrong field");
    }
    if (addOrEdit === "add") {
      this.setState({ addCustomerData: prevCustomerData });
    } else if (addOrEdit === "edit") {
      this.setState({ editCustomerData: prevCustomerData });
    }

    // console.log(this.addCustomerData);
  };

  editIsTrue = i => {
    console.log(i);
    this.setState({ editCustomer: { edit: true, indexToEdit: i } });
  };

  onBackHandler = () => {
    this.setState({
      editCustomer: { edit: false, indexToEdit: null },
      editCustomerData: { firstName: "", lastName: "", email: "" }
    });
  };

  deleteCustomerHandler = ndx => {
    console.log(ndx);
    let prevState = this.state.customers;
    prevState.splice(ndx, 1);
    this.setState({ customers: prevState });
    axios.delete("http://localhost:5000", { data: { ndx } });
  };

  render() {
    if (this.state.editCustomer.edit) {
      return (
        <EditCustomer
          textValues={this.state.editCustomerData}
          onChangeField={this.nameHandler}
          back={this.onBackHandler}
          edit={this.editcustomerhandler}
        />
      );
    } else {
      return (
        <div>
          <CustomerList
            edit={this.editIsTrue}
            customers={this.state.customers}
            delete={this.deleteCustomerHandler}
          />
          <AddCustomer
            click={this.addcustomerhandler}
            onChangeField={this.nameHandler}
            textValues={this.state.addCustomerData}
          />
        </div>
      );
    }
  }
}
export default App;
