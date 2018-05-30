const _ = require('lodash')
const chroma = require('chroma-js')
const { PERIOD } = require('./constants')
const { getRandHex, sine, precisionRound } = require('./helpers')

module.exports = class FlowerPedals {
  constructor(delTheta) {
    this.delTheta = delTheta
    this.rotation = 0
    this.color = getRandHex()
    this.timePassedMS = 0
  }
  update() {
    this.rotation = (global.timeDelta * 0.0007) + this.rotation
    this.timePassedMS = this.timePassedMS + global.timeDelta
    this.phase = (this.timePassedMS % PERIOD) / PERIOD

    if (precisionRound(this.phase, 2) === 0.00) {
      this.color = getRandHex()
      this.k = _.random(2, 11)
    }

    this.amplitude = (global.height / 1.7) * sine(this.phase)
    if (global.height > global.width) {
      this.amplitude = (global.width / 1.7) * sine(this.phase)
    }
  }
  render() {
    ctx.save()
    ctx.rotate(this.rotation)
    const arr = new Array(Math.ceil(2 * Math.PI / this.delTheta)).fill(0).map((val, i) => ((2 * Math.PI * this.delTheta) * i))

    const largestValue = arr[arr.length - 1]

    let lastX = null
    let lastY = null
    ctx.beginPath()
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color

    arr.forEach(val => {
      const x = this.amplitude * Math.cos(this.k * val) * Math.cos(val)
      const y = this.amplitude * Math.cos(this.k * val) * Math.sin(val)

      if (lastX && lastY) {
        ctx.moveTo(lastX, lastY)
      }

      ctx.lineTo(x, y)
      lastX = x
      lastY = y
    })
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}