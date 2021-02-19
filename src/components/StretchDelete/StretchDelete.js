import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { stretchDelete } from '../../api/stretch'

class StretchDelete extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false
    }
  }

  componentDidMount () {
    const { match, user } = this.props
    stretchDelete(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
        return res
      })
      .then(console.log('Success'))
  }

  render () {
    const { deleted } = this.state

    if (deleted) {
      return <Redirect to='/stretches/'/>
    }

    return (
      <div>made it</div>
    )
  }
}

export default withRouter(StretchDelete)
