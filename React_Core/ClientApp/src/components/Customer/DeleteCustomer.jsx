import React from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteCustomer = (props) => {
    const{open, toggleModal, id, refreshData} = props;
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