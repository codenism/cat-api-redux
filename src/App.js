import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import CatList from './containers/CatList/CatList'

class App extends Component {
  render() {


    return (
      <Layout>
        <Switch>
        <Route path="/" exact component={CatList} />
        <Redirect to="/" />
      </Switch>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
