import React, { Component, Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class Stretch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: ''
    }
  }

  render () {
    const { stretch, user } = this.props
    const ownerOptions = (
      <Fragment>
        <Link to={`/stretch/update/${stretch.id}`}>
          <Button variant="primary">Update</Button>
        </Link>
        <Link to={`/stretch/delete/${stretch.id}`}>
          <Button variant="primary">Delete</Button>
        </Link>
      </Fragment>
    )
    const ownerCheck = function () {
      if (stretch.owner === user.id) {
        return ownerOptions
      }
    }
    return (
      <Fragment>
        {console.log(stretch)}
        {console.log(user)}
        <Card>
          <Card.Header as="h5">
            <Link to={`/stretches/${stretch.id}`}>
              {stretch.name}
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Title>{stretch.description}</Card.Title>
            <Card.Text>
              {stretch.instructions}
            </Card.Text>
            {ownerCheck()}
          </Card.Body>
        </Card>
      </Fragment>
    )
  }
}

export default Stretch
