import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { stretchIndex } from '../../api/stretch'
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
    const { user } = this.props

    stretchIndex(user)
      // .then(res => console.log(res))
      .then(res => this.setState({ stretches: res.data.stretches }))
  }

  render () {
    const { stretches } = this.state
    if (!stretches) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const stretchJsx = stretches.map(stretch => (
      <Stretch key={stretch.id} stretch={stretch}/>
    ))
    return (
      <div>{stretchJsx}</div>
    )
  }
}

export default withRouter(StretchIndex)
