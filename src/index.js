import React, { Component, createRef } from 'react'
import './index.css'
import Snap from 'snapsvg'
import variantTable from './utils/variantTable'

class LoadingEffect extends Component {
  render () {
    const { variant } = this.props
    const {
      svgPreserveAspectRatio,
      pathD
    } = (variantTable[variant] || variant)
    return (
      <div ref={this.loaderRef} className='pageload-overlay'>
        <svg xmlns='http://www.w3.org/2000/svg'
          width='100%' height='100%' viewBox='0 0 80 60'
          preserveAspectRatio={svgPreserveAspectRatio}
        >
          <path d={pathD} />
        </svg>
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.loaderRef = createRef()
  }

  componentDidMount () {
    const loader = this.loaderRef.current
    const svg = Snap(loader.querySelector('svg'))
    this.path = svg.select('path')
    this.isAnimating = false
  }

  componentDidUpdate (prevProps) {
    if (prevProps.in !== this.props.in) {
      if (this.props.in) {
        this.show()
      } else {
        this.hide()
      }
    }
  }

  componentWillUnmount () {
  }

  show = () => {
    if (this.isAnimating) {
      return false
    }
    this.isAnimating = true
    const loader = this.loaderRef.current
    this._animateSVG('in', () => {
      loader.classList.add('pageload-loading')
    })
    loader.classList.add('show')
  }

  hide = () => {
    const initialPath = this.path.attr('d')
    const loader = this.loaderRef.current
    loader.classList.remove('pageload-loading')
    this._animateSVG('out', () => {
      // reset path
      this.path.attr('d', initialPath)
      loader.classList.remove('show')
      this.isAnimating = false
    })
  }

  _animateSVG = (direction, callback) => {
    const {
      variant,
      speedIn,
      speedOut = speedIn,
      easingIn = window.mina,
      easingOut = easingIn
    } = this.props
    const {
      openingSteps,
      closingSteps = openingSteps
    } = variantTable[variant] || variant
    const steps = direction === 'out' ? closingSteps : openingSteps
    const stepsTotal = steps.length
    var speed = direction === 'out' ? speedOut : speedIn

    var easing = direction === 'out' ? easingOut : easingIn
    console.log(this.path.attr('d'))
    const nextStep = (pos) => {
      if (pos > stepsTotal - 1) {
        if (callback && typeof callback === 'function') {
          callback()
        }
        return
      }
      this.path.animate({
        'path': steps[pos]
      }, speed, easing, function () {
        nextStep(pos + 1)
      })
    }
    nextStep(0)
  }
}

export default LoadingEffect
