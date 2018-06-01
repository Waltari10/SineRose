const SimplexNoise = require('simplex-noise')

function calculateAngle (lengthTotal, lengthSoFar, wind = 3) {
  const angle = (lengthSoFar / lengthTotal) * (wind / 10) * (Math.PI / 2)
  if (angle < 0) {
    return 0
  } 
  if (angle > (Math.PI / 2)) {
    return Math.PI / 2
  }
  return angle
}


module.exports = class GrassStraw {
  constructor(locationX, locationY, length, density, width, rotation = 0) {
    this.locationX = locationX
    this.locationY = locationY
    this.length = length
    this.density = density
    this.segmentLength = this.length / this.density
    this.width = width
    this.noiseX = 0
    this.rotation = rotation
    this.simplex = new SimplexNoise()
  }
  update() {
    this.noise = this.simplex.noise2D(this.noiseX / 50, 0) / 10
    this.noiseX++
  }
  render() {
    ctx.save()
    ctx.translate(this.locationX, this.locationY)
    ctx.rotate(this.rotation)

    let lastX = 0
    let lastY = 0 + this.segmentLength
    ctx.strokeStyle = 'green'

    for (let i = 0; i <= this.density; i++) {
      ctx.beginPath()
      const lengthToStart = this.segmentLength * i
      let lineWidth = ((this.length - lengthToStart) / this.length) * this.width
      if (lineWidth < 0.2) {
        lineWidth = 0.2
      }
      ctx.lineWidth = lineWidth
      const angle = calculateAngle(this.length, lengthToStart, global.wind + this.noise)

      ctx.moveTo(lastX, lastY)

      const x = (Math.cos(angle + (Math.PI / 2)) * this.segmentLength) + lastX
      const y = - (Math.sin(angle + (Math.PI / 2))) * this.segmentLength + lastY
      ctx.lineTo(x, y)
      lastX = x
      lastY = y
      ctx.stroke()
    }

    ctx.restore()
  }
}