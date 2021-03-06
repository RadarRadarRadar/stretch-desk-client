import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

import StretchAdd from './components/StretchAdd/StretchAdd'
import StretchIndex from './components/StretchIndex/StretchIndex'
import StretchMyIndex from './components/StretchMyIndex/StretchMyIndex'
import StretchShow from './components/StretchShow/StretchShow'
import StretchUpdate from './components/StretchUpdate/StretchUpdate'
import StretchDelete from './components/StretchDelete/StretchDelete'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user}/>
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/add-stretch' render={() => (
            <StretchAdd msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/stretches' render={() => (
            <StretchIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/stretches/:id' render={() => (
            <StretchShow msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/stretch/update/:id' render={() => (
            <StretchUpdate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/stretch/delete/:id' render={() => (
            <StretchDelete msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/mystretches' render={() => (
            <StretchMyIndex msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
