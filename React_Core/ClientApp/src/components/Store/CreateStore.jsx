import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateStore = (props) => {

  //Receiving all the data that is passed from the StoreTable Component
  const{open, toggleModal, refreshData} = props;

  //Using hooks to grab the value given by the user
  const[name, setName] = useState('');
  const[address, setAddress] = useState('');

  //Sending the new details of the store to the database to add new store
  const createStore = () => {
      axios.post(`Stores/PostStore`,{
          name: name,
          address: address,
      })
      .then( ({data}) => {
          toggleModal(); 
          refreshData();              
      })
      .catch(err => console.log(err));
  };

  return(   
      <Modal open={open}>
      <Modal.Header>Create New Store</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
              <Form.Field>
              <label>Name</label>
              <input placeholder='Enter Name' onChange={(e)=>setName(e.target.value)} />
              </Form.Field>
              <Form.Field>
              <label>Address</label>
              <input placeholder='Enter Address' onChange={(e)=>setAddress(e.target.value)} />
              </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={toggleModal}>Cancel</Button>
        <Button positive onClick={createStore}>Create</Button>
      </Modal.Actions>
    </Modal>
  );    
};

export default CreateStore;