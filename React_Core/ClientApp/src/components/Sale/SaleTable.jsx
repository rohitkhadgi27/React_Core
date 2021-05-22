import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import DeleteSale from './DeleteSale';
import CreateSale from './CreateSale';
import EditSale from './EditSale';
import '../Table.css';

export default class SaleTable extends Component {
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

  // Modal state on clicking the sales delete button
  deleteModal = (saleDeleteId) => {
    this.setState({
      deleteModalState: true,
      createModalState: false,
      editModalState: false,
      toggleModal: true,
      id: saleDeleteId
    });
  }

  // Modal state on clicking the sales create button
  createModal = () => {
    this.setState({
      deleteModalState: false,
      createModalState: true,
      editModalState: false,
      toggleModal: true,
    })
  }

  // Modal state on clicking the sales edit button
  editModal = (saleInfo) => {
    this.setState({
      deleteModalState: false,
      createModalState: false,
      editModalState: true,
      toggleModal: true,
      info: saleInfo
    })
  }


  render() { 
    const {sales, refreshData} = this.props;
    const  {toggleModal} = this.state;
    return(
      <div className="container">

      
        {/* Switching to the Componenets from it's state's value */}
        {this.state.deleteModalState && 
        (<DeleteSale open={toggleModal} toggleModal={this.toggleModalHandler} id={this.state.id} refreshData={refreshData} /> )}

        {this.state.createModalState && 
        (<CreateSale open={toggleModal} toggleModal={this.toggleModalHandler} refreshData={refreshData} /> )}   

        {this.state.editModalState && 
        (<EditSale open={toggleModal} toggleModal={this.toggleModalHandler} sale={this.state.info}
         refreshData={refreshData} /> )}   


        <Button primary onClick={()=>this.createModal()}><Icon name='plus' />New Sale</Button>
        <Table basic>
          <Table.Header>
            <Table.Row bgcolor="#E1DEDE">
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sales.map(s => 
              <Table.Row key={s.id}>
                <Table.Cell>{s.customer.name}</Table.Cell>
                <Table.Cell>{s.product.name}</Table.Cell>
                <Table.Cell>{s.store.name}</Table.Cell>
                <Table.Cell>{s.dateSold.slice(0, 10)}</Table.Cell>
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

