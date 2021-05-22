import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CustomerProduct extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      address: "",
      errorMsg: "",
      lastUser: null 
    };
  }

  //Updating the state with the change in the props
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.store !== prevState.lastUser) {
      return {
        name: nextProps.store.name,
        address: nextProps.store.address,
        lastUser: nextProps.store
      }  
    }else{
      return null
    }   
  }
  

  //Validating the edit input fields of stores
  validate = () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let errorMsg = "";

    if(this.state.name.length >= 30){
      errorMsg = "Name field cannot be too long!"
    }
    if(this.state.name.length <= 2){
      errorMsg = "Name field cannot be too short!"
    }
    if(this.state.address.length <= 2){
      errorMsg = "Address cannot be too short!"
    }
    if(this.state.address.length >= 50){
      errorMsg = "Address cannot be too long!"
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
                <input name="name"  value={this.state.name} onChange={this.changeHandler} />     
                </Form.Field>
                <Form.Field>
                <label>Address</label>
                <input name="address" value={this.state.address} onChange={this.changeHandler}/>
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









