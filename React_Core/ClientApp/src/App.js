import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import GetCustomers from './components/Customer/GetCustomers';
import GetProducts from './components/Product/GetProducts';
import GetStores from './components/Store/GetStores';
import GetSales from './components/Sale/GetSales';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/customers' component={GetCustomers} />
        <Route path='/products' component={GetProducts} />
        <Route path='/stores' component={GetStores} />
        <Route path='/sales' component={GetSales} />
      </Layout>
    );
  }
}
