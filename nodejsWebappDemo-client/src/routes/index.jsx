import React from "react"
import { Route, Redirect, Switch, HashRouter as Router } from "react-router-dom"
import App from 'containers/App'
import Index from 'containers/App/Index/index'

const routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => (
        <Redirect to='/platform/home' />
      )} />
      <Route exact path='/platform' render={() => (
        <Redirect to='/platform/home' />
      )} />
      <Route
        path="/platform/home"
        component={props => (
          <App {...props}>
            <Switch>
              <Route
                path='/platform/home'
                exact={true}
                render={() => <Redirect to='/platform/home/index' />}
              />
              {/* 首页 */}
              <Route path='/platform/home/index' component={Index} />
            </Switch>
          </App>
        )}
      />
    </Switch>
  </Router>
)

export default routes
