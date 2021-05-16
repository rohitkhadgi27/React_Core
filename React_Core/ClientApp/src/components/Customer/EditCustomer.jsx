import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CustomerProduct extends Component {

  constructor(props){
    const{product}=props
    super(props)
    this.state = {
      name: "",
      address: "",
      errorMsg: "" 
    };
  }

  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if(this.state > 50){
      errorMsg = "Fields cannot be too long!"
    }
    if(this.state.name < 2){
      errorMsg = "Too short name!"
    }
    if(!this.state.name || !this.state.address){
      errorMsg = "Fields cannot be blank!"
    }
    if(format.test(this.state.name) || format.test(this.state.address)){
      errorMsg = "Special characters are not allowed in the fields!"
    }
    if(!(/\D/.test(this.state.name)) || !(/\D/.test(this.state.address)) ){
      errorMsg = "Fields accept only non-numberic value and cannot be empty!"
    }

    if(errorMsg){
      this.setState({errorMsg});
      return false;
    }
    return true;
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //Saving the edited information from the input fields
  saveCustomer = (customer, toggleModal, refreshData) => { 
    const isValid = this.validate();
    if(isValid){
      axios.put(`Customers/PutCustomer/${customer.id}`,{
        id: customer.id,
        name: this.state.name,
        address: this.state.address,
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
  cancelCustomer = (toggleModal) => {
    this.setState({
      errorMsg: ""
    });
    toggleModal()
  }
 
  render(){
    const {open, toggleModal, customer, refreshData} = this.props
    return(   
        <Modal open={open}>
        <Modal.Header>Edit Customer</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name"  defaultValue={customer.name} onChange={this.changeHandler} />     
                </Form.Field>
                <Form.Field>
                <label>Address</label>
                <input name="address" defaultValue={customer.address} onChange={this.changeHandler}/>
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={()=>this.cancelCustomer(toggleModal)}>Cancel</Button>
          <Button positive onClick={()=>this.saveCustomer(customer,toggleModal, refreshData)}>Save</Button>       
        </Modal.Actions>
      </Modal>
    ); 
  }   
};









