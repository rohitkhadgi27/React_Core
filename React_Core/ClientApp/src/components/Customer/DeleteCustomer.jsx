import React from 'react';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteCustomer = (props) => {

    //Receiving all the data that is passed from the CustomerTable Component
    const{open, toggleModal, id, refreshData} = props;

    //Sending the selected customer id to the database to delete the customer
    const deleteCustomer = (id) => {
        axios.delete(`Customers/DeleteCustomer/${id}`)
        .then( ({data}) => {
            toggleModal(); 
            refreshData();              
        })
        .catch(err => console.log(err));
    };

    return(   
        <Modal open={open}>     
            <Header icon='archive' content='Are you Sure you want to delete?' />
            <Modal.Actions>
                <Button color='red' onClick={toggleModal}>
                <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={()=>deleteCustomer(id)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
    
};

export default DeleteCustomer;