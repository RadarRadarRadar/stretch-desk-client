import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { stretchUpdate } from '../../api/stretch'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class StretchUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      video: '',
      instructions: '',
      updated: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onStretchUpdate = event => {
    event.preventDefault()
    const { match, user } = this.props
    console.log(user)

    stretchUpdate(this.state, match.params.id, user)
      .then(res => {
        this.setState({ updated: true })
        return res
      })
      .then(console.log('Success'))
      .catch(error => console.error(error))
  }

  render () {
    const { name, description, video, instructions, updated } = this.state
    const { match } = this.props

    if (updated) {
      return <Redirect to={`/stretches/${match.params.id}`}/>
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Add a Stretch</h3>
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
