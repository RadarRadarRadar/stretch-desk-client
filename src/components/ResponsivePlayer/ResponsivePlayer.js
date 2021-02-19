import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class ResponsivePlayer extends Component {
  render () {
    const playerWrapper = {
      position: 'relative',
      paddingTop: '56.25%'
    }

    const reactPlayer = {
      position: 'absolute',
      top: '0',
      left: '0'
    }

    return (
      <div className='player-wrapper' style={playerWrapper}>
        <ReactPlayer
          className='react-player'
          url={this.props.url}
          width='100%'
          height='100%'
          style={reactPlayer}
        />
      </div>
    )
  }
}

export default ResponsivePlayer
