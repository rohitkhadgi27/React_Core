import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Dropdown} from 'semantic-ui-react'

export default class EditSale extends Component {
  constructor(props){
    super(props)
    this.state = {
      customer: "",
      product: "",
      store: "",
      lastUser: null,
      CustomerId: null,
      ProductId: null,
      StoreId: null,
      errorMsg: "",
      customerlist: [],
      productlist:[],
      storelist:[]
    };
  }

  //Updating the state with the change in the props by grabing the value from SaleTable
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.sale !== prevState.lastUser) {
      return {
        customer: nextProps.sale.customer.name,
        product: nextProps.sale.product.name,
        store: nextProps.sale.store.name,
        lastUser: nextProps.sale
      };
    }else{
      return null
    }   
  }

  //Getting all the data
  componentDidMount(){
    this.customerList();
    this.productList();
    this.storeList();
  }

  //Getting customers data
  customerList() {
    axios.get('Customers/GetCustomers')
      .then((res) => {
          console.log(res.data)
          res.data.forEach((c) => {
            this.state.customerlist.push({
              key: c.id,
              text: c.name,
              value: c.name
            });
          });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  //Getting products data 
  productList() {
    axios.get('Products/GetProducts')
      .then((res) => {
          console.log(res.data)
          res.data.forEach((c) => {
            this.state.productlist.push({
              key: c.id,
              text: c.name,
              value: c.name
            });
          });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  //Getting stores data 
  storeList() {
    axios.get('Stores/GetStores')
    .then((res) => {
        console.log(res.data)
        res.data.forEach((c) => {
          this.state.storelist.push({
            key: c.id,
            text: c.name,
            value: c.name
          });
        });
    })
    .catch((err) => {
      console.log(err)
    });
  };

  //closing the modal and setting the state to null
  cancelSale = (toggleModal) => {
    this.setState({
      ProductId: null,
      CustomerId: null,
      StoreId: null,
      errorMsg: ""});
    toggleModal();
  }

  //Saving the edited information from the input fields
    saveSale = (sale, toggleModal, date, refreshData) => { 
      if((this.state.CustomerId == null) || (this.state.ProductId == null || (this.state.StoreId == null))){      
        this.setState({
          errorMsg: "All the records weren't selected!"
        })
      }else{
        axios.put(`Sales/PutSale/${sale.id}`,{
          id: sale.id,
          ProductId: this.state.ProductId,
          CustomerId: this.state.CustomerId,
          StoreId: this.state.StoreId,
          DateSold: date
        })
        .then( ({data}) => {
          this.setState({    
            ProductId: null,
            CustomerId: null,
            StoreId: null
          });    
          toggleModal();
          refreshData();                        
        })
        .catch(err => console.log(err));
      }
    }  
 
    render(){
        const {open, toggleModal, sale, refreshData} = this.props;
        const date = new Date().toLocaleString('en-US').slice(0, 9);
        return(   
            <Modal open={open}>
            <Modal.Header>Edit Sale</Modal.Header>
            <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
            <Modal.Content>
            <Modal.Description>
            <Form>
            <Form.Field>
              <label>Sale Name</label>
              <input type="text" value={date} />
            </Form.Field>
            <Form.Field>
              <label>Choose Customer</label>
              <Dropdown placeholder="Select Customer"
              search selection options={this.state.customerlist} onChange={(e, data) => {
                const { value } = data;
                const { key } = (data.options.find(x => x.value === value));
                  console.log("Customer value is "+value)
                  this.setState({
                    CustomerId: key,
                  });     
              }} />
            </Form.Field>
            <Form.Field>
                <label>Choose Product</label>
                <Dropdown placeholder="Select Product"
                search selection options={this.state.productlist} onChange={(e, data) => {
                  const { value } = data;
                  const { key } = (data.options.find(x => x.value === value));
                  console.log("value for product is ="+value)
                  console.log("key for product is ="+key)
                    this.setState({
                      ProductId: key,
                  });     
                }} />
            </Form.Field>
            <Form.Field>
              <label>Choose Store</label>
              <Dropdown placeholder="Select Store"
              search selection options={this.state.storelist} onChange={(e, data) => {
                const { value } = data;
                const { key } = (data.options.find(x => x.value === value));
                   this.setState({
                     StoreId: key,
                  });
              }} />
            </Form.Field>
          </Form>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={()=>this.cancelSale(toggleModal)}>Cancel</Button>
            <Button positive onClick={()=>this.saveSale(sale,toggleModal, date, refreshData)}>Save</Button>       
            </Modal.Actions>
        </Modal>
        ); 
    }   
};





