/**
 * 
 * @param {any} height height is the height of the grass straw in pixels
 * @param {any} wind wind is the amount of wind present (replace with curve?)
 * @param {any} density density is lines per straw
 * 
 */

// It should have more points where the angle is steepest. Doesn't currently. 
// Actually doens't matter when a lot of points are used but good for optimization later

// Right now curves too smoothly.

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


module.exports = function drawGrassStraw(locationX, locationY, length, density, wind) {
  ctx.save()

  let lastX = locationX
  let lastY = locationY
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'green'

  for (let i = 0; i <= density; i++) {
    const segmentLength = length / density
    const lengthToStart = segmentLength * i
    const angle = calculateAngle(length, lengthToStart, wind)

    const x = (Math.cos(angle + (Math.PI / 2)) * segmentLength) + lastX
    const y = - (Math.sin(angle + (Math.PI / 2))) * segmentLength + lastY

    ctx.lineTo(x, y)
    lastX = x
    lastY = y
  }
  
  ctx.stroke()
  ctx.restore()
}