import React, { Component, createRef } from 'react'
import './index.css'
import Snap from 'snapsvg'
import variantTable, { linear } from './utils/variantTable'

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
    this.initialPath = this.path.attr('d')
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

  show = () => {
    if (this.isAnimating) {
      return false
    }
    console.log('show')
    this.isAnimating = true
    const loader = this.loaderRef.current
    this._animateSVG('in', () => {
      loader.classList.add('pageload-loading')
    })
    loader.classList.add('show')
  }

  hide = () => {
    console.log('hide')
    const loader = this.loaderRef.current
    loader.classList.remove('pageload-loading')
    this._animateSVG('out', () => {
      // reset path to initial state
      this.path.attr('d', this.initialPath)
      loader.classList.remove('show')
      this.isAnimating = false
    })
  }

  _animateSVG = (direction, callback) => {
    const {
      variant,
      speedIn: propsSpeedIn,
      speedOut: propsSpeedOut,
      easingIn: propsEasingIn,
      easingOut: propsEasingOut
    } = this.props
    const {
      openingSteps,
      closingSteps = openingSteps,
      speedIn: variantSpeedIn,
      speedOut: variantSpeedOut,
      easingIn: variantEasingIn,
      easingOut: variantEasingOut
    } = variantTable[variant] || variant

    // get computed value, propsValue > variantValue > defaultValue
    const speedIn = propsSpeedIn || variantSpeedIn || 500
    const speedOut = propsSpeedOut || variantSpeedOut || speedIn
    const easingIn = propsEasingIn || variantEasingIn || linear
    const easingOut = propsEasingOut || variantEasingOut || easingIn

    const steps = direction === 'out' ? closingSteps : openingSteps
    const stepsTotal = steps.length
    const speed = direction === 'out' ? speedOut : speedIn
    const easing = direction === 'out' ? easingOut : easingIn

    console.log(speedIn, '\n', speedOut, '\n', easingIn, '\n', easingOut, '\n')
    console.log(steps, '\n', stepsTotal, '\n', speed, '\n', easing, '\n')

    // the frame animation function
    const nextStep = (pos) => {
      if (pos > stepsTotal - 1) {
        if (callback && typeof callback === 'function') {
          console.log(pos, Date.now())
          callback()
        }
        return
      }
      console.log(pos, Date.now())
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
