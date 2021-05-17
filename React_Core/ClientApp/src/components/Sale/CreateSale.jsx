import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateSale = (props) => {

  //Receiving all the data that is passed from the SaleTable Component
  const{open, toggleModal, refreshData} = props;

  //Using hooks to grab the value given by the user
  const[customer, setCustomer] = useState('');
  const[product, setProduct] = useState('');
  const[store, setStore] = useState('');
  const[date, setDate] = useState('');

  //Sending the new details of the sale to the database to add new sale
  const createSale = () => {
      axios.post(`Sales/PostSale`,{
          customer: customer,
          product: product,
          store: store,
          date: date
      })
      .then( ({data}) => {
          toggleModal(); 
          refreshData();              
      })
      .catch(err => console.log(err));
  };

  return(   
      <Modal open={open}>
      <Modal.Header>Create New Sale</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
              <Form.Field>
              <label>Customer</label>
              <input placeholder='Enter Customer' onChange={(e)=>setCustomer(e.target.value)} />
              </Form.Field>
              <Form.Field>
              <label>Product</label>
              <input placeholder='Enter Product' onChange={(e)=>setProduct(e.target.value)} />
              </Form.Field>
              <Form.Field>
              <label>Store</label>
              <input placeholder='Enter Store' onChange={(e)=>setStore(e.target.value)} />
              </Form.Field>
              <Form.Field>
              <label>Date</label>
              <input placeholder='Enter Date' onChange={(e)=>setDate(e.target.value)} />
              </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={toggleModal}>Cancel</Button>
        <Button positive onClick={createSale}>Create</Button>
      </Modal.Actions>
    </Modal>
  );    
};

export default CreateSale;