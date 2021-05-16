import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import DeleteProduct from './DeleteProduct';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import '../Table.css';

export default class ProductTable extends Component {
  constructor(props){
    super(props);
    this.editModal = this.editModal.bind(this);
    this.state = {
      toggleModal: false,
    }  
  }

  // Making the value of the Modal opposite for opening and closing of the Modal
  toggleModalHandler = () => {
    this.setState({
      toggleModal: !this.state.toggleModal,
      id: '',
      name: "",
      price: ""
    });
  }

  // Modal state on clicking the products delete button
  deleteModal = (productDeleteId) => {
    this.setState({
      deleteModalState: true,
      createModalState: false,
      editModalState: false,
      toggleModal: true,
      id: productDeleteId
    });
  }

  // Modal state on clicking the products create button
  createModal = () => {
    this.setState({
      deleteModalState: false,
      createModalState: true,
      editModalState: false,
      toggleModal: true,
    })
  }

  // Modal state on clicking the products edit button
  editModal = (productInfo) => {
    this.setState({
      deleteModalState: false,
      createModalState: false,
      editModalState: true,
      toggleModal: true,
      info: productInfo
    })
  }

  render() { 
    const {products, refreshData} = this.props;
    const  {toggleModal} = this.state;

    const pro = products.map((p) => {
      return(
      <Table.Row key={p.id}>
        <Table.Cell>{p.name}</Table.Cell>
        <Table.Cell>${p.price}</Table.Cell>
        <Table.Cell><Button color='yellow' onClick={()=>this.editModal(p)}>
          <Icon name='pencil alternate' />Edit</Button></Table.Cell>
        <Table.Cell><Button negative onClick={()=>this.deleteModal(p.id)}>
          <Icon name='trash' />Delete</Button></Table.Cell>
      </Table.Row>
      )});
      

    return(
      <div className="container">
        <Button primary onClick={()=>this.createModal()}><Icon name='plus' />New Product</Button> 
        <Table basic>
          <Table.Header>
            <Table.Row bgcolor="#E1DEDE">
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pro}
          </Table.Body>
        </Table>
         {/* Switching to the Componenets from it's state's value  */}
         {this.state.deleteModalState && (<DeleteProduct open={toggleModal} toggleModal={this.toggleModalHandler} 
        id={this.state.id} refreshData={refreshData} /> )}
        {this.state.createModalState && (<CreateProduct open={toggleModal} toggleModal={this.toggleModalHandler} 
        refreshData={refreshData} /> )}   
        {this.state.editModalState && (<EditProduct open={toggleModal} toggleModal={this.toggleModalHandler} 
        product={this.state.info} refreshData={refreshData}/> )}
      </div>  
    );     
  };
}

