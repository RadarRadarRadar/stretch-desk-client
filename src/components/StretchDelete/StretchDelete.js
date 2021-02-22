import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { stretchDelete } from '../../api/stretch'
import messages from '../AutoDismissAlert/messages'

class StretchDelete extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false
    }
  }

  componentDidMount () {
    const { msgAlert, match, user } = this.props
    stretchDelete(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
        return res
      })
      .then(() => msgAlert({
        heading: 'Update Success',
        message: messages.updateStretchSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ stretches: null })
        msgAlert({
          heading: 'Update Failed with error: ' + error.message,
          message: messages.updateStretchFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { deleted } = this.state

    if (deleted) {
      return <Redirect to='/mystretches/'/>
    }

    return (
      <div>made it</div>
    )
  }
}

export default withRouter(StretchDelete)
