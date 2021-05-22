import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state = {     
      name: "",
      price: "",
      errorMsg: "",
      lastUser: null
    };
  }
  
  //Updating the state with the change in the props
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.product !== prevState.lastUser) {
      return {
        name: nextProps.product.name,
        price: nextProps.product.price,
        lastUser: nextProps.product
      };
    }else{
      return null
    }   
  }

  //Validating the edit input fields of products
  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if(this.state.name.length >= 30){
      errorMsg = "Name cannot be too long or too short!"
    }
    if(this.state.name.length <= 2){
      errorMsg = "Name cannot be too short!"
    }
    
    if(this.state.price.length>=20){
      errorMsg = "Price cannot be that high !"
    }
   
    if(format.test(this.state.name) || format.test(this.state.price)){
      errorMsg = "Special characters are not allowed in the fields!"
    }
    if((/\D/.test(this.state.price))  || !(this.state.price)){
      errorMsg = "Price field accepts only numberic value and cannot be empty!"
    }
    if(!(/\D/.test(this.state.name))){
      errorMsg = "Name field accepts only non-numberic value and cannot be empty!"
    }
    if(errorMsg){
      this.setState({errorMsg});
      return false;
    }
    return true;
  }

  //Setting the userinput in the state
  changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  //Saving the edited information from the input fields
  saveProduct = (product, toggleModal, refreshData) => { 
    const isValid = this.validate();
    if(isValid){
      axios.put(`Products/PutProduct/${product.id}`,{
        id: product.id,
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
  
  //cancelling the modal
  cancelProduct = (toggleModal) => {
    this.setState({
      errorMsg: ""
    });
    toggleModal()
  }
 
  render(){
    const {open, toggleModal, product, refreshData} = this.props
    return(   
        <Modal open={open}>
        <Modal.Header>Edit Product</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name" value={this.state.name} onChange={this.changeHandler} />     
                </Form.Field>
                <Form.Field>
                <label>Price</label>
                <input name="price" value={this.state.price} onChange={this.changeHandler}/>
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={()=>this.cancelProduct(toggleModal)}>Cancel</Button>
          <Button positive onClick={()=>this.saveProduct(product,toggleModal, refreshData)}>Save</Button>       
        </Modal.Actions>
      </Modal>
    ); 
  }   
};















