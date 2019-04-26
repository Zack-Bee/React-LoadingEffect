const easeinout = (n) => {
  if (n === 1) {
    return 1
  }
  if (n === 0) {
    return 0
  }
  const q = 0.48 - n / 1.04
  const Q = Math.sqrt(0.1734 + q * q)
  const x = Q - q
  const X = Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1)
  const y = -Q - q
  const Y = Math.pow(Math.abs(y), 1 / 3) * (y < 0 ? -1 : 1)
  const t = X + Y + 0.5
  return (1 - t) * 3 * t * t + t * t * t
}

const linear = n => n

const bounce = (n) => {
  let s = 7.5625
  let p = 2.75
  let l
  if (n < 1 / p) {
    l = s * n * n
  } else {
    if (n < 2 / p) {
      n -= 1.5 / p
      l = s * n * n + 0.75
    } else {
      if (n < 2.5 / p) {
        n -= 2.25 / p
        l = s * n * n + 0.9375
      } else {
        n -= 2.625 / p
        l = s * n * n + 0.984375
      }
    }
  }
  return l
}

const variantTable = {
  lazyStretch: {
    openingSteps: [
      'M20,15 50,30 50,30 30,30 Z',
      'M0,0 80,0 50,30 20,45 Z',
      'M0,0 80,0 60,45 0,60 Z',
      'M0,0 80,0 80,60 0,60 Z'
    ],
    closingSteps: [
      'M0,0 80,0 60,45 0,60 Z',
      'M0,0 80,0 50,30 20,45 Z',
      'M20,15 50,30 50,30 30,30 Z',
      'M30,30 50,30 50,30 30,30 Z'
    ],
    svgPreserveAspectRatio: 'none',
    initialPath: 'M30,30 50,30 50,30 30,30 Z',
    speedIn: 100
  },
  circle: {
    openingSteps: [
      'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z'
    ],
    svgPreserveAspectRatio: 'xMidYMid slice',
    speedIn: 300,
    easingIn: easeinout,
    initialPath: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z'
  },
  spill: {
    openingSteps: [
      'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 400,
    easingIn: easeinout,
    initialPath: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z'
  },
  frameIt: {
    openingSteps: [
      'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 300,
    easingIn: easeinout,
    initialPath: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
  },
  tunnelVision: {
    openingSteps: [
      'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z'
    ],
    svgPreserveAspectRatio: 'xMidYMid slice',
    speedIn: 300,
    easingIn: easeinout,
    initialPath: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z'
  },
  windscreenWiper: {
    openingSteps: [
      'M 40,100 150,0 -65,0 z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 400,
    easingIn: easeinout,
    initialPath: 'M 40,100 150,0 l 0,0 z'
  },
  jammedBlind: {
    openingSteps: [
      'M 0,60 80,60 80,50 0,40 0,60',
      'M 0,60 80,60 80,25 0,40 0,60',
      'M 0,60 80,60 80,25 0,10 0,60',
      'M 0,60 80,60 80,0 0,0 0,60'
    ],
    closingSteps: [
      'M 0,60 80,60 80,20 0,0 0,60',
      'M 0,60 80,60 80,20 0,40 0,60',
      'm 0,60 80,0 0,0 -80,0'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 200,
    easingIn: linear,
    initialPath: 'm 0,60 80,0 0,0 -80,0'
  },
  parallelogram: {
    openingSteps: [
      'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 300,
    speedOut: 600,
    easingIn: easeinout,
    easingOut: bounce,
    initialPath: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
  },
  tilted: {
    openingSteps: [
      'M 0,0 80,-10 80,60 0,70 0,0'
    ],
    closingSteps: [
      'M 0,-10 80,-20 80,-10 0,0 0,-10'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 400,
    easingIn: easeinout,
    initialPath: 'M 0,70 80,60 80,80 0,80 0,70'
  },
  lateralSwipe: {
    openingSteps: [
      'M 40,-65 145,80 -65,80 40,-65'
    ],
    closingSteps: [
      'm 40,-65 0,0 L -65,80 40,-65'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 500,
    easingIn: easeinout,
    initialPath: 'M 40,-65 145,80 40,-65'
  },
  wave: {
    openingSteps: [
      'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 400,
    easingIn: easeinout,
    initialPath: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
  },
  origami: {
    openingSteps: [
      'm -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 400,
    easingIn: easeinout,
    initialPath: 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z'
  },
  curtain: {
    openingSteps: [
      'm 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z'
    ],
    svgPreserveAspectRatio: 'none',
    speedIn: 700,
    easingIn: easeinout,
    initialPath: 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z'
  }
}

export default variantTable

export { easeinout }

export { bounce }

export { linear }
