import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './container/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';

class App extends Component {


  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path='/' component={BurgerBuilder} exact />
            <Route path='/checkout' component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
