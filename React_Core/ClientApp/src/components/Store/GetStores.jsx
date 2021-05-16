import React, { Component } from 'react';
import axios from 'axios';
import StoreTable from './StoreTable';

export default class GetStores extends Component {
  constructor(){
    super();
    this.state = {stores: []};
  }
 
  componentDidMount(){
    this.storeList();
  }

  //React state update on an unmounted component
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
}

//Getting all the stores data 
  storeList() {
    axios.get(`Stores/GetStores`)
    .then(({data}) => {
      this.setState({
        stores: data
      });
    })
    .catch(err => console.log(err));
  };

  render(){
    const {stores} = this.state;
    return(
      <div>
        <StoreTable stores = {stores} refreshData ={this.storeList()} />
      </div>  
    );
  }
};

