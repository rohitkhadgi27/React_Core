import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import DeleteCustomer from './DeleteCustomer';
import CreateCustomer from './CreateCustomer';
import './CustomerTable.css';

export default class CustomerTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleModal: false,
    }  
  }

  toggleModalHandler = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  deleteModal = (customerDeleteId) => {
    this.setState({
      deleteModalState: true,
      createModalState: false,
      toggleModal: true,
      id: customerDeleteId
    });
  }

  createModal = () => {
    this.setState({
      deleteModalState: false,
      createModalState: true,
      toggleModal: true,
    })
  }


  render() { 
    const {customers, refreshData} = this.props;
    const  {toggleModal} = this.state;
    return(
      <div className="container">

        {this.state.deleteModalState && (<DeleteCustomer open={toggleModal} toggleModal={this.toggleModalHandler} id={this.state.id} refreshData={refreshData} /> )}
        {this.state.createModalState && (<CreateCustomer open={toggleModal} toggleModal={this.toggleModalHandler} refreshData={refreshData} /> )}   

        <Button primary onClick={()=>this.createModal()}>New Customer</Button>
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
                <Table.Cell><Button color='yellow'>Edit</Button></Table.Cell>
                <Table.Cell><Button negative onClick={()=>this.deleteModal(c.id)}>Delete</Button></Table.Cell>
              </Table.Row>)
            }
          </Table.Body>
        </Table>
      </div>  
    );  
  };
}

