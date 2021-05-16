import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {

  constructor(props){
    super(props);
    this.state = { 
      activeItem: 'home'
    }

    //Getting the names of the menubar items from the URL 
    if (window.performance) {
      if (performance.navigation.type === 1) {      
        const url = window.location.href.split("")
        const urlNavName = url.splice(24, url.length).join("");
        this.state = {
          activeItem: urlNavName
        };
      } 
    }
  }

  //Setting the menu items active when selected
  handleItemClick = (e, {name}) => this.setState({
    activeItem: name});

  render() {
    const {activeItem} = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item link
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link}
            to="/home"
            
          />
          <Menu.Item link
            name='customers'
            active={activeItem === 'customers'}
            onClick={this.handleItemClick}
            as={Link}
            to="/customers"
          />
          <Menu.Item
            name='products'
            active={activeItem === 'products'}
            onClick={this.handleItemClick}
            as={Link}
            to="/products"
          />
          <Menu.Item
            name='stores'
            active={activeItem === 'stores'}
            onClick={this.handleItemClick}
            as={Link}
            to="/stores"
          />
          <Menu.Item
            name='sales'
            active={activeItem === 'sales'}
            onClick={this.handleItemClick}
            as={Link}
            to="/sales"
          />
        </Menu>
      </Segment>
    )
  } 
}

