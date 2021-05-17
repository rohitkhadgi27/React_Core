import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'semantic-ui-react'

export default class EditSale extends Component {

    constructor(props){
        const{sales}=props
        super(props)
        this.state = {
        customer: "",
        product: "",
        store: ""
        };
    }

    //Validating the edit input fields of Sales
    validate = () => {
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let errorMsg = "";
    
        if((this.state.customer.length >= 30) || (this.state.customer.length <= 2) || (this.state.product.length <= 2) || (this.state.name.product >= 50)
        (this.state.store.length >= 30) || (this.state.store.length <= 2)){
          errorMsg = "Too long or too short details is not valid!"
        }
        
        if(!(this.state.customer.length) || !(this.state.product.length) || !(this.state.store.length)){
          errorMsg = "Fields cannot be blank!"
        }
        if(format.test(this.state.customer) || format.test(this.state.product) || format.test(this.state.store)){
          errorMsg = "Special characters are not allowed in the fields!"
        }
        if(!(/\D/.test(this.state.customer)) || !(/\D/.test(this.state.product)) || !(/\D/.test(this.state.store)) ){
          errorMsg = "Fields accept only non-numberic value and cannot be empty!"
        }
    
        if(errorMsg){
          this.setState({errorMsg});
          return false;
        }
        return true;
    }

    changeHandler = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        });
    }

  //Saving the edited information from the input fields
    saveSale = (sale, toggleModal, refreshData) => { 
        const isValid = this.validate();
        if(isValid){
        axios.put(`Sales/PutSale/${sale.id}`,{
            id: sale.id,
            customer: this.state.customer,
            product: this.state.product,
            store: this.state.store
        })
        .then( ({data}) => {    
        this.setState({
            errorMsg: ""
        });  
        toggleModal();
        refreshData();                        
        })
        .catch(err => console.log(err));
        }  
    };
    
 
    //cancelling the modal
    cancelSale = (toggleModal) => {
        this.setState({
        errorMsg: ""
        });
        toggleModal()
    }
 
    render(){
        const {open, toggleModal, sale, refreshData} = this.props
        return(   
            <Modal open={open}>
            <Modal.Header>Edit Sale</Modal.Header>
            <div><h4 style={{color: "red", margin: "20px 0px 1px 20px"}}>{this.state.errorMsg}</h4></div>
            <Modal.Content>
            <Modal.Description>
                <Form>
                    <Form.Field>
                    <label>Customer</label>
                    <input name="customer"  defaultValue={sale.customer.name} onChange={this.changeHandler} />     
                    </Form.Field>
                    <Form.Field>
                    <label>Product</label>
                    <input name="product" defaultValue={sale.product.name} onChange={this.changeHandler}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Store</label>
                    <input name="store"  defaultValue={sale.store.name} onChange={this.changeHandler} />     
                    </Form.Field>
                    <Form.Field>
                    <label>Date</label>
                    <input value={sale.dateSold.slice(0, 10)} onChange={this.changeHandler}/>
                    </Form.Field>
                </Form>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={()=>this.cancelSale(toggleModal)}>Cancel</Button>
            <Button positive onClick={()=>this.saveSale(sale,toggleModal, refreshData)}>Save</Button>       
            </Modal.Actions>
        </Modal>
        ); 
    }   
};









