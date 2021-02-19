import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { stretchAdd } from '../../api/stretch'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class StretchAdd extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      video: '',
      instructions: '',
      added: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onStretchAdd = event => {
    event.preventDefault()
    const { msgAlert, user } = this.props

    stretchAdd(this.state, user)
      .then(this.setState({ added: true }))
      .then(() => msgAlert({
        heading: 'Add Success',
        message: messages.addStretchSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ stretches: null })
        msgAlert({
          heading: 'Add Failed with error: ' + error.message,
          message: messages.addStretchFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, video, instructions, added } = this.state
    if (added) {
      return <Redirect to='/stretches'/>
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Add a Stretch</h3>
          <Form onSubmit={this.onStretchAdd}>
            <Form.Group controlId="stretchName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={name}
                placeholder="Stretch Name Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="stretchDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
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
                required
                name="video"
                value={video}
                placeholder="Video Link Goes Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="stretchInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                required
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
              Add Stretch
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(StretchAdd)
