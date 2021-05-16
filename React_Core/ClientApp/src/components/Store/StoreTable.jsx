import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import DeleteStore from './DeleteStore';
import CreateStore from './CreateStore';
import EditStore from './EditStore';
import '../Table.css';

export default class StoreTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleModal: false,
    }  
  }

  // Making the value of the Modal opposite for opening and closing of the Modal
  toggleModalHandler = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  // Modal state on clicking the stores delete button
  deleteModal = (storeDeleteId) => {
    this.setState({
      deleteModalState: true,
      createModalState: false,
      editModalState: false,
      toggleModal: true,
      id: storeDeleteId
    });
  }

  // Modal state on clicking the stores create button
  createModal = () => {
    this.setState({
      deleteModalState: false,
      createModalState: true,
      editModalState: false,
      toggleModal: true,
    })
  }

  // Modal state on clicking the stores edit button
  editModal = (storeInfo) => {
    this.setState({
      deleteModalState: false,
      createModalState: false,
      editModalState: true,
      toggleModal: true,
      info: storeInfo
    })
  }


  render() { 
    const {stores, refreshData} = this.props;
    const  {toggleModal} = this.state;
    return(
      <div className="container">

        {/* Switching to the Componenets from it's state's value */}
        {this.state.deleteModalState && (<DeleteStore open={toggleModal} toggleModal={this.toggleModalHandler} id={this.state.id} refreshData={refreshData} /> )}
        {this.state.createModalState && (<CreateStore open={toggleModal} toggleModal={this.toggleModalHandler} refreshData={refreshData} /> )}   
        {this.state.editModalState && (<EditStore open={toggleModal} toggleModal={this.toggleModalHandler} store={this.state.info} refreshData={refreshData} /> )}   


        <Button primary onClick={()=>this.createModal()}><Icon name='plus' />New Store</Button>
        <Table basic>
          <Table.Header>
            <Table.Row bgcolor="#E1DEDE">
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {stores.map(s => 
              <Table.Row key={s.id}>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.address}</Table.Cell>
                <Table.Cell><Button color='yellow' onClick={()=>this.editModal(s)}><Icon name='pencil alternate' />Edit</Button></Table.Cell>
                <Table.Cell><Button negative onClick={()=>this.deleteModal(s.id)}><Icon name='trash' />Delete</Button></Table.Cell>
              </Table.Row>)
            }
          </Table.Body>
        </Table>
      </div>  
    );  
  };
}

