import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CustomerProduct extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      address: "",
      errorMsg: "" 
    };
  }

  //Validating the edit input fields of stores
  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if((this.state.name.length >= 30) || (this.state.name.length <= 2) || (this.state.address.length <= 2) || (this.state.name.length >= 50)){
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

  //Setting the userinput in the state
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //Saving the edited information from the input fields
  saveStore = (store, toggleModal, refreshData) => { 
    const isValid = this.validate();
    if(isValid){
      axios.put(`Stores/PutStore/${store.id}`,{
        id: store.id,
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
  cancelStore = (toggleModal) => {
    this.setState({
      errorMsg: ""
    });
    toggleModal()
  }
 
  render(){
    const {open, toggleModal, store, refreshData} = this.props
    return(   
        <Modal open={open}>
        <Modal.Header>Edit Store</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name"  defaultValue={store.name} onChange={this.changeHandler} />     
                </Form.Field>
                <Form.Field>
                <label>Address</label>
                <input name="address" defaultValue={store.address} onChange={this.changeHandler}/>
                </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={()=>this.cancelStore(toggleModal)}>Cancel</Button>
          <Button positive onClick={()=>this.saveStore(store,toggleModal, refreshData)}>Save</Button>       
        </Modal.Actions>
      </Modal>
    ); 
  }   
};









