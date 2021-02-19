import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { stretchIndex } from '../../api/stretch'
import messages from '../AutoDismissAlert/messages'
import Spinner from 'react-bootstrap/Spinner'

import Stretch from '../Stretch/Stretch'

class StretchIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stretches: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    stretchIndex(user)
      // .then(res => console.log(res))
      .then(res => this.setState({ stretches: res.data.stretches }))
      .then(() => msgAlert({
        heading: 'Index Success',
        message: messages.indexStretchesSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ stretches: null })
        msgAlert({
          heading: 'Index Failed with error: ' + error.message,
          message: messages.indexStretchesFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { stretches } = this.state
    const { user } = this.props
    if (!stretches) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const stretchJsx = stretches.map(stretch => (
      <Stretch key={stretch.id} stretch={stretch} user={user }/>
    ))
    return (
      <div>{stretchJsx}</div>
    )
  }
}

export default withRouter(StretchIndex)
