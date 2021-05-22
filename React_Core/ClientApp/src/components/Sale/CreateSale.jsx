import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const CreateSale = (props) => {
    const [customerlist] = useState([]);
    const [productlist] = useState([]);
    const [storelist] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    //Props from SaleTable
    const { open, toggleModal, refreshData } = props;

    //Current time
    const date = new Date().toLocaleString('en-US').slice(0, 9);
  
    //Adding new sale record in the database from the given list in drop down
    const createSale = () => {
      if((selectedCustomerId == null) || (selectedProductId == null) || (selectedStoreId == null)){
        setErrorMsg("Fields cannot be black!");
      }else{
        axios.post(`Sales/PostSale`,{
          ProductId: selectedProductId,
          CustomerId: selectedCustomerId,
          StoreId: selectedStoreId,
          DateSold: date,
      })
      .then( ({data}) => {
        setSelectedCustomerId(null);
        setSelectedProductId(null);
        setSelectedStoreId(null);
          toggleModal(); 
          refreshData();              
      })
      .catch(err => console.log(err));
    }  
  }

  // closing the modal and settting the state to null
  const cancelSale = () => {
    setSelectedCustomerId(null);
    setSelectedProductId(null);
    setSelectedStoreId(null);
    setErrorMsg("");
    toggleModal();
  }

  // Getting all the customers, products and store list 
    useEffect(() => {
      axios.get('Customers/GetCustomers')
        .then((res) => {
          res.data.forEach((c) => {
            customerlist.push({
              key: c.id,
              text: c.name,
              value: c.name
            });
          });
        })
        .catch((err) => {
            console.log(err)
        });
            
        axios.get('Products/GetProducts')
        .then((res) => {
          res.data.forEach((p) => {
            productlist.push({
              key: p.id,
              text: p.name,
              value: p.name
            });
          });
        })
        .catch((err) => {
          console.log(err)
        });

        axios.get('Stores/GetStores')
          .then((res) => {
              res.data.forEach((s) => {
                storelist.push({
                  key: s.id,
                  text: s.name,
                  value: s.name
                });
              });
            })
            .catch((err) => {
              console.log(err)
            });    
    }, []);

    return (
      <Modal open={open}>
        <Modal.Header>Create Sale</Modal.Header>
        <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{errorMsg}</h4></div>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Sale Name</label>
                <input type="text" value={date} />
              </Form.Field>
              <Form.Field>
                  <label>Choose Customer</label>
                  <Dropdown placeholder='Select Customer' search selection options={customerlist} onChange={(e, data) => {
                      const { value } = data;
                      const { key } = (data.options.find(x => x.value === value));
                      if(value == ''){
                        setSelectedCustomerId(null)
                      }else{
                        setSelectedCustomerId(key);
                      }
                  }} />
​
              </Form.Field>
              <Form.Field>
                  <label>Choose Product</label>
                  <Dropdown placeholder='Select Product' search selection options={productlist} onChange={(e, data) => {
                      const { value } = data;
                      const { key } = (data.options.find(x => x.value === value));
                      if(value == ''){
                        setSelectedProductId(null)
                      }else{
                        setSelectedProductId(key);
                      }
                  }} />
              </Form.Field>
              <Form.Field>
                  <label>Choose Store</label>
                  <Dropdown placeholder='Select Store' search selection options={storelist} onChange={(e, data) => {
                      const { value } = data;
                      const { key } = (data.options.find(x => x.value === value));
                      if(value == ''){
                        setSelectedStoreId(null)
                      }else{
                        setSelectedStoreId(key);
                      }
                  }} />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='yellow' onClick={cancelSale}>
            Cancel
          </Button>
          <Button color='green' onClick={createSale}>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
};

export default CreateSale