import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateProduct = (props) => {

  //Receiving all the data that is passed from the ProductTable Component
  const{open, toggleModal, refreshData} = props;

  //Using hooks to grab the value given by the user
  const[name, setName] = useState('');
  const[price, setPrice] = useState('');

  //Sending the new details of the product to the database to add new product
  const createProduct = () => {
      axios.post(`Products/PostProduct`,{
          name: name,
          price: price,
      })
      .then( ({data}) => {
          toggleModal(); 
          refreshData();              
      })
      .catch(err => console.log(err));
  };

  return(   
      <Modal open={open}>
      <Modal.Header>Create New Product</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
              <Form.Field>
              <label>Name</label>
              <input placeholder='Enter Name' onChange={(e)=>setName(e.target.value)} />
              </Form.Field>
              <Form.Field>
              <label>Price</label>
              <input placeholder='Enter Price' onChange={(e)=>setPrice(e.target.value)} />
              </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={toggleModal}>Cancel</Button>
        <Button positive onClick={createProduct}>Create</Button>
      </Modal.Actions>
    </Modal>
  );    
};

export default CreateProduct;