import React from 'react';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteStore = (props) => {

    //Receiving all the data that is passed from the StoreTable Component
    const{open, toggleModal, id, refreshData} = props;

    //Sending the selected store id to the database to delete the store
    const deleteStore = (id) => {
        axios.delete(`Stores/DeleteStore/${id}`)
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
                <Button color='green' onClick={()=>deleteStore(id)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
    
};

export default DeleteStore;