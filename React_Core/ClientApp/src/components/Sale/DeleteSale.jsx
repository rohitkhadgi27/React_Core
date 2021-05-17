import React from 'react';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteSale = (props) => {

    //Receiving all the data that is passed from the SaleTable Component
    const{open, toggleModal, id, refreshData} = props;

    //Sending the selected sale id to the database to delete the sale
    const deleteSale = (id) => {
        axios.delete(`Sales/DeleteSale/${id}`)
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
                <Button color='green' onClick={()=>deleteSale(id)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
    
};

export default DeleteSale;