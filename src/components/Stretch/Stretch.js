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
        <div style={{ alignContent: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={`/stretch/update/${stretch.id}`}>
            <Button variant="primary">Update</Button>
          </Link>
          <Link to={`/stretch/delete/${stretch.id}`}>
            <Button variant="danger">Delete</Button>
          </Link>
        </div>
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
        <div className='col-10 mx-auto mt-3'>
          <Card style={{ border: '1px solid #000' }}>
            <Card.Header as="h5" style={{ backgroundColor: '#5FA8D3' }}>
              <Link variant="dark" to={`/stretches/${stretch.id}`}>
                {stretch.name}
              </Link>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#CAE9FF' }}>
              <Card.Title>{stretch.description}</Card.Title>
              {videoCheck(stretch.video)}
              <Card.Text>
                {stretch.instructions}
              </Card.Text>
              {ownerCheck()}
            </Card.Body>
          </Card>
        </div>
      </Fragment>
    )
  }
}

export default Stretch
