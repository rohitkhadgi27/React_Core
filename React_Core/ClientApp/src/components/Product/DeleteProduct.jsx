import React from 'react';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteProduct = (props) => {

    //Receiving all the data that is passed from the ProductTable Component
    const{open, toggleModal, id, refreshData} = props;

    //Sending the selected product id to the database to delete the product
    const deleteProduct = (id) => {
        axios.delete(`Products/DeleteProduct/${id}`)
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
                <Button color='green' onClick={()=>deleteProduct(id)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );  
};

export default DeleteProduct;