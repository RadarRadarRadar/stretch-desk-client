import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { stretchShow } from '../../api/stretch'
import messages from '../AutoDismissAlert/messages'

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
    const { msgAlert, match, user } = this.props
    stretchShow(match.params.id, user)
      .then(res => this.setState({ stretch: res.data.stretch }))
      .then(() => msgAlert({
        heading: 'Show Success',
        message: messages.showStretchSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ stretch: null })
        msgAlert({
          heading: 'Show Failed with error: ' + error.message,
          message: messages.showStretchFailure,
          variant: 'danger'
        })
      })
  }

  componentWillUnmount () {
    this.setState({ stretch: null })
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
