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
    const { stretch } = this.props
    return (
      <Fragment>
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
            <Link to={`/stretch/update/${stretch.id}`}>
              <Button variant="primary">Update</Button>
            </Link>
          </Card.Body>
        </Card>
      </Fragment>
    )
  }
}

// <div>---</div>
// <div>{stretch.name}</div>
// <div>{stretch.description}</div>
// <div>{stretch.video}</div>
// <div>{stretch.instructions}</div>
// <div>{stretch.id}</div>
// <div>---</div>

export default Stretch
