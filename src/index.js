import React, { Component, createRef } from 'react'
import SVGLoader from './utils/SVGLoader'
import './index.css'

class LoadingEffect extends Component {
  render () {
    return (
      <div ref={this.loaderRef}
        className='pageload-overlay'
        data-opening='M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z'
        data-closing='M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z'
      >
        <svg xmlns='http://www.w3.org/2000/svg'
          width='100%' height='100%' viewBox='0 0 80 60'
          preserveAspectRatio='none'
        >
          <path d='M30,30 50,30 50,30 30,30 Z' />
        </svg>
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.loaderRef = createRef()
  }

  componentDidMount () {
    console.log(this.loaderRef.current)
    const {
      speedIn = 100,
      speedOut = 100
    } = this.props
    this.loader = new SVGLoader(this.loaderRef.current, {
      speedIn,
      speedOut
    })
    console.log(this.loader)
  }

  componentDidUpdate (prevProps) {
    console.log(prevProps, this.props)
    if (prevProps.in !== this.props.in) {
      if (this.props.in) {
        this.loader.show()
      } else {
        this.loader.hide()
      }
    }
  }

  componentWillUnmount () {
    setTimeout(() => {
      console.log(this.loader)
    }, 3000)
  }
}

export default LoadingEffect
