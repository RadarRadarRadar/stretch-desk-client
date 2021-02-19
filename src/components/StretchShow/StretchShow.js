import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { stretchShow } from '../../api/stretch'

import Spinner from 'react-bootstrap/Spinner'

import Stretch from '../Stretch/Stretch'

class StretchShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stretch: null
    }
  }

  componentDidMount () {
    const { match, user } = this.props
    stretchShow(match.params.id, user)
      .then(res => this.setState({ stretch: res.data.stretch }))
  }

  render () {
    const { stretch } = this.state
    const { user } = this.props
    if (!stretch) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const stretchShowJsx = <Stretch stretch={stretch} user={user}/>

    return (
      <Fragment>
        {stretchShowJsx}
      </Fragment>
      // <Stretch stretch={stretch}/>
    )
  }
}

export default withRouter(StretchShow)
