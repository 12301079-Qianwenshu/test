import React from "react"
import { Route, Redirect, Switch, HashRouter as Router } from "react-router-dom"
import App from 'containers/App'
import Index from 'containers/App/Index/index'

const routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => (
        <Redirect to='/platform' />
      )} />
      <Route
        path="/platform"
        component={props => (
          <App {...props}>
            <Switch>
              <Route
                path='/platform'
                exact={true}
                render={() => <Redirect to='/platform/index' />}
              />
              {/* 首页 */}
              <Route path='/platform/index' component={Index} />
            </Switch>
          </App>
        )}
      />
    </Switch>
  </Router>
)

export default routes
