import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CreateCustomer extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      address: "",
      errorMsg: "" 
    };
  }

  //Receiving all the data that is passed from the StoreTable Component


  //Using hooks to grab the value given by the user
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    
  }


  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if(this.state.name.length >= 30 || this.state.name.length <= 2 || this.state.address.length <= 2 || this.state.name.length >= 50){
      errorMsg = "Too long or too short details is not valid!"
    }
    
    if(!(this.state.name.length) || !(this.state.address.length)){
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



  //Sending the new details of the store to the database to add new store
  createStore = (toggleModal, refreshData) => {
    const isValid = this.validate();
    if(isValid){
      axios.post(`Stores/PostStore`,{
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

  cancelStore = (toggleModal) => {
    this.setState({
      errorMsg: ""
    });
    toggleModal();
  }


  render(){
    const{open, toggleModal, refreshData} = this.props;
    return(   
        <Modal open={open}>
        <Modal.Header>Create New Store</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name" placeholder='Enter Name' onChange={this.changeHandler} />
                </Form.Field>
                <Form.Field>
                <label>Address</label>
                <input name="address" placeholder='Enter Address' onChange={this.changeHandler} />
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={()=>this.cancelStore(toggleModal)}>Cancel</Button>
          <Button positive onClick={()=>this.createStore(toggleModal, refreshData)}>Create</Button>
        </Modal.Actions>
      </Modal>
    );
  }    
};
