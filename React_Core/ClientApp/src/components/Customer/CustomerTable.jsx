import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import DeleteCustomer from './DeleteCustomer';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';
import '../Table.css';

export default class CustomerTable extends Component {
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

  // Modal state on clicking the customers delete button
  deleteModal = (customerDeleteId) => {
    this.setState({
      deleteModalState: true,
      createModalState: false,
      editModalState: false,
      toggleModal: true,
      id: customerDeleteId
    });
  }

  // Modal state on clicking the customers create button
  createModal = () => {
    this.setState({
      deleteModalState: false,
      createModalState: true,
      editModalState: false,
      toggleModal: true,
    })
  }

  // Modal state on clicking the customers edit button
  editModal = (customerInfo) => {
    this.setState({
      deleteModalState: false,
      createModalState: false,
      editModalState: true,
      toggleModal: true,
      info: customerInfo
    })
  }


  render() { 
    const {customers, refreshData} = this.props;
    const  {toggleModal} = this.state;
    return(
      <div className="container">

        {/* Switching to the Componenets from it's state's value */}
        {this.state.deleteModalState && (<DeleteCustomer open={toggleModal} toggleModal={this.toggleModalHandler} id={this.state.id} refreshData={refreshData} /> )}
        {this.state.createModalState && (<CreateCustomer open={toggleModal} toggleModal={this.toggleModalHandler} refreshData={refreshData} /> )}   
        {this.state.editModalState && (<EditCustomer open={toggleModal} toggleModal={this.toggleModalHandler} customer={this.state.info} refreshData={refreshData} /> )}   


        <Button primary onClick={()=>this.createModal()}><Icon name='plus' />New Customer</Button>
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
            {customers.map(c => 
              <Table.Row key={c.id}>
                <Table.Cell>{c.name}</Table.Cell>
                <Table.Cell>{c.address}</Table.Cell>
                <Table.Cell><Button color='yellow' onClick={()=>this.editModal(c)}><Icon name='pencil alternate' />Edit</Button></Table.Cell>
                <Table.Cell><Button negative onClick={()=>this.deleteModal(c.id)}><Icon name='trash' />Delete</Button></Table.Cell>
              </Table.Row>)
            }
          </Table.Body>
        </Table>
      </div>  
    );  
  };
}

