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
  constructor(locationX, locationY, length, density) {
    this.locationX = locationX
    this.locationY = locationY
    this.length = length
    this.density = density
    this.segmentLength = this.length / this.density
  }
  update() {

  }
  render() {
    ctx.save()

    let lastX = this.locationX
    let lastY = this.locationY + this.segmentLength
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'green'

    for (let i = 0; i <= this.density; i++) {
      const lengthToStart = this.segmentLength * i
      const angle = calculateAngle(this.length, lengthToStart, global.wind)

      const x = (Math.cos(angle + (Math.PI / 2)) * this.segmentLength) + lastX
      const y = - (Math.sin(angle + (Math.PI / 2))) * this.segmentLength + lastY
      ctx.lineTo(x, y)
      lastX = x
      lastY = y
    }

    ctx.stroke()
    ctx.restore()
  }
}