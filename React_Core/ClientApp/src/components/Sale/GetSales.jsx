import React, { Component } from 'react';
import axios from 'axios';
import SaleTable from './SaleTable';

export default class GetSales extends Component {
  constructor(){
    super();
    this.state = {sales: []};
  }
 
  componentDidMount(){
    this.saleList();
  }

  //React state update on an unmounted component
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
}

//Getting all the sales data 
  saleList() {
    axios.get(`Sales/GetSales`)
    .then(({data}) => {
      this.setState({
        sales: data
      });
    })
    .catch(err => console.log(err));
  };

  render(){
    const {sales} = this.state;
    return(
      <div>
        <SaleTable sales = {sales} refreshData ={this.saleList()} />
      </div>  
    );
  }
};

