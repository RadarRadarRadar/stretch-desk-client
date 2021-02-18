import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class AuthCard extends Component {
  render () {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Sign Up
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            Sign Up goes here
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Sign In
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}

export default AuthCard
