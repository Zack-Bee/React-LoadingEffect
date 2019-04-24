/**
 * svgLoader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
import Snap from 'snapsvg'
import * as classie from './classes'
function SVGLoader (el, options) {
  this.el = el
  Object.assign(this.options, options)
  this._init()
}

SVGLoader.prototype.options = {
  speedIn: 500,
  easingIn: window.mina.linear
}

SVGLoader.prototype._init = function () {
  var s = Snap(this.el.querySelector('svg'))
  this.path = s.select('path')
  this.initialPath = this.path.attr('d')

  var openingStepsStr = this.el.getAttribute('data-opening')
  this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : ''
  this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0
  if (this.openingStepsTotal === 0) return

  // if data-closing is not defined then the path will animate to its original shape
  var closingStepsStr = this.el.getAttribute('data-closing') ? this.el.getAttribute('data-closing') : this.initialPath
  this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : ''
  this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0

  this.isAnimating = false

  if (!this.options.speedOut) {
    this.options.speedOut = this.options.speedIn
  }
  if (!this.options.easingOut) {
    this.options.easingOut = this.options.easingIn
  }
}

SVGLoader.prototype.show = function () {
  if (this.isAnimating) return false
  this.isAnimating = true
  // animate svg
  var self = this

  var onEndAnimation = function () {
    classie.addClass(self.el, 'pageload-loading')
  }
  this._animateSVG('in', onEndAnimation)
  classie.add(this.el, 'show')
}

SVGLoader.prototype.hide = function () {
  var self = this
  classie.removeClass(this.el, 'pageload-loading')
  this._animateSVG('out', function () {
    // reset path
    self.path.attr('d', self.initialPath)
    classie.removeClass(self.el, 'show')
    self.isAnimating = false
  })
}

SVGLoader.prototype._animateSVG = function (dir, callback) {
  var self = this

  var pos = 0

  var steps = dir === 'out' ? this.closingSteps : this.openingSteps

  var stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal

  var speed = dir === 'out' ? self.options.speedOut : self.options.speedIn

  var easing = dir === 'out' ? self.options.easingOut : self.options.easingIn

  var nextStep = function (pos) {
    if (pos > stepsTotal - 1) {
      if (callback && typeof callback === 'function') {
        callback()
      }
      return
    }
    self.path.animate({ 'path': steps[pos] }, speed, easing, function () { nextStep(pos) })
    pos++
  }

  nextStep(pos)
}

// add to global namespace
export default SVGLoader
