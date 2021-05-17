import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CreateProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      price: "",
      errorMsg: "" 
    };
  }

  //Receiving all the data that is passed from the ProductTable Component


  //Using hooks to grab the value given by the user
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    
  }


  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if(this.state.name.length >= 30 || this.state.name.length <= 2){
      errorMsg = "Name cannot be too long or too short!"
    }
    if(this.state.price.length>=10){
      errorMsg = "Price cannot be that high !"
    }
    if(!this.state.name || !this.state.price){
      errorMsg = "Fields cannot be blank!"
    }
    if(format.test(this.state.name) || format.test(this.state.price)){
      errorMsg = "Special characters are not allowed in the fields!"
    }
    if((/\D/.test(this.state.price)) ){
      errorMsg = "Price field accepts only numberic value and cannot be empty!"
    }
    if(!(/\D/.test(this.state.name)) ){
      errorMsg = "Name field accepts only non-numberic value and cannot be empty!"
    }
    if(errorMsg){
      this.setState({errorMsg});
      return false;
    }
    return true;
  }



  //Sending the new details of the product to the database to add new product
  createProduct = (toggleModal, refreshData) => {
    const isValid = this.validate();
    if(isValid){
      axios.post(`Products/PostProduct`,{
          name: this.state.name,
          price: this.state.price,
      })
      .then( ({data}) => {
        this.setState({
          errorMsg: ""
        });  
          toggleModal(); 
          refreshData();              
      })
      .catch(err => console.log(err));
    }  
  };

  cancelProduct = (toggleModal) => {
    this.setState({
      errorMsg: ""
    });
    toggleModal();
  }


  render(){
    const{open, toggleModal, refreshData} = this.props;
    return(   
        <Modal open={open}>
        <Modal.Header>Create New Product</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name" placeholder='Enter Name' onChange={this.changeHandler} />
                </Form.Field>
                <Form.Field>
                <label>Price</label>
                <input name="price" placeholder='Enter Price' onChange={this.changeHandler} />
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={()=>this.cancelProduct(toggleModal)}>Cancel</Button>
          <Button positive onClick={()=>this.createProduct(toggleModal, refreshData)}>Create</Button>
        </Modal.Actions>
      </Modal>
    );
  }    
};
