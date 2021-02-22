import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { stretchUpdate } from '../../api/stretch'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class StretchUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      updatedId: null
    }
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  redirectToAdded = event => {
    const { match } = this.props
    const redirect = () => <Redirect to={`/stretches/${match.params.id}`}/>
    setTimeout(() => {
      redirect()
    }, 1000)
  }

  onStretchUpdate = event => {
    event.preventDefault()
    const { msgAlert, match, user } = this.props
    console.log(user)
    console.log(this.state)

    stretchUpdate(this.state, match.params.id, user)
      .then(() => msgAlert({
        heading: 'Update Success',
        message: messages.updateStretchSuccess,
        variant: 'success'
      }))
      .then(this.setState({ updatedId: match.params.id }))
      .catch(error => {
        this.setState({ stretch: null })
        msgAlert({
          heading: 'Update Failed with error: ' + error.message,
          message: messages.updateStretchFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, video, instructions, updatedId } = this.state
    // const { match } = this.props

    if (updatedId) {
      return <Redirect to={`/stretches/${updatedId}`}/>
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Update a Stretch</h3>
          <Form onSubmit={this.onStretchUpdate}>
            <Form.Group controlId="stretchName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                placeholder="Stretch Name Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="stretchDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name="description"
                value={description}
                placeholder="Stretch Description Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="stretchVideo">
              <Form.Label>Video Link</Form.Label>
              <Form.Control
                name="video"
                value={video}
                placeholder="Video Link Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="stretchInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as='textarea'
                rows={6}
                name="instructions"
                value={instructions}
                placeholder="Stretch Instructions Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Update Stretch
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(StretchUpdate)
