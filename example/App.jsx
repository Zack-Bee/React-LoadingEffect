import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import LoadingEffect from '../src/index'
import './index.css'

class App extends Component {
  render () {
    return (
      <div style={{
        display: 'flex'
      }}>
        <div style={{
          height: '50vh',
          width: '50vw',
          backgroundColor: '#f44336',
          position: 'relative'
        }}>
          <LoadingEffect in={this.state.in} variant='jammedBlind' />
        </div>
        <div style={{
          height: '50vh',
          width: '50vw',
          backgroundColor: '#f44336',
          position: 'relative'
        }}>
          <LoadingEffect in={this.state.in} variant='circle' />
        </div>
        <div style={{
          height: '50vh',
          width: '50vw',
          backgroundColor: '#f44336',
          position: 'relative'
        }}>
          {/* <LoadingEffect in={this.state.in} variant='spill' /> */}
        </div>
        <div style={{
          height: '50vh',
          width: '50vw',
          backgroundColor: '#f44336',
          position: 'relative'
        }}>
          {/* <LoadingEffect in={this.state.in} variant='frameIt' /> */}
        </div>
      </div>
    )
  }

  state = {
    in: false
  }

  componentDidMount () {
    this.setState({
      in: !this.state.in
    })
    setInterval(() => {
      this.setState({
        in: !this.state.in
      })
    }, 3000)
  }
}

export default hot(App)
