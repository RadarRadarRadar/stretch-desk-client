import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { stretchAdd } from '../../api/stretch'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class StretchAdd extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      video: '',
      instructions: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onStretchAdd = event => {
    event.preventDefault()
    const { user } = this.props
    console.log(user)

    stretchAdd(this.state, user)
      .then(console.log('Success'))
      .catch(error => console.error(error))
  }

  render () {
    const { name, description, video, instructions } = this.state

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
