import React, { Component, Fragment } from 'react'
import ReactPlayer from 'react-player'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ResponsivePlayer from '../ResponsivePlayer/ResponsivePlayer'

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
          <Button variant="danger">Delete</Button>
        </Link>
      </Fragment>
    )

    const videoDisplay = (
      <ResponsivePlayer url={stretch.video}/>
    )

    const ownerCheck = function () {
      if (stretch.owner === user.id) {
        return ownerOptions
      }
    }
    const videoCheck = function (video) {
      if (ReactPlayer.canPlay(video)) {
        return videoDisplay
      } else {
        return 'Video link does not work.'
      }
    }

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
            {videoCheck(stretch.video)}
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
