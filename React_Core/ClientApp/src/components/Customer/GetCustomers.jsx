import React, { Component, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';

export default class GetCustomers extends Component {
  constructor(){
    super();
    this.state = {customers: []};
  }
 
  componentDidMount(){
    this.customerList();
  }

  customerList() {
    axios.get(`Customers/GetCustomers`)
    .then(( {data} ) => {
      this.setState({
        customers: data
      });
    })
    .catch(err => console.log(err));
  };

  render(){
    const {customers} = this.state;
    return(
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { customers.map(c => 
            <Table.Row>
              <Table.Cell>{ c.name }</Table.Cell>
              <Table.Cell>{ c.address }</Table.Cell>
              <Table.Cell><Button color='yellow'>Edit</Button></Table.Cell>
              <Table.Cell><Button negative>Delete</Button></Table.Cell>
            </Table.Row>
            ) 
          };
        </Table.Body>
      </Table>
    );
  }
};

