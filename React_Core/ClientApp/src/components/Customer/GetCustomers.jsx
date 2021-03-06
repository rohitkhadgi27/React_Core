import React, { Component } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';

export default class GetCustomers extends Component {
  constructor(){
    super();
    this.state = {customers: []};
  }
 
  componentDidMount(){
    this.customerList();
  }

  //React state update on an unmounted component
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
}

//Getting all the customers data 
  customerList() {
    axios.get(`Customers/GetCustomers`)
    .then(({data}) => {
      this.setState({
        customers: data
      });
    })
    .catch(err => console.log(err));
  };

  render(){
    const {customers} = this.state;
    return(
      <div>
        <CustomerTable customers = {customers} refreshData ={this.customerList()} />
      </div>  
    );
  }
};

