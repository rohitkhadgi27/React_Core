import React, { Component } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';

export default class GetCustomers extends Component {
  constructor(){
    super();
    this.state = {
      products: []
    };
  }
 
  componentDidMount(){
    this.productList();
  }

  //React state update on an unmounted component
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
}

//Getting all the products data 
  productList() {
    axios.get(`Products/GetProducts`)
    .then(({data}) => {
      this.setState({
        products: data
       
      });
    })
    .catch(err => console.log(err));
  };

  render(){
    const {requiredItem, products} = this.state;
    return(
      <div>
        <ProductTable products={products} refreshData={this.productList()} />
      </div>  
    );
  }
};

