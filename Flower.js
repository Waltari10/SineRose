/**
 * 
 * @param {any} delTheta del_theta is the discrete step size for discretizing the continuous range of angles from 0 to 2 * pi
 * @param {any} k  petal coefficient. if k is odd then k is the number of petals. if k is even then k is half the number of petals
 * @param {any} amplitude length of each petal
 * 
 */
module.exports = function drawFlower(delTheta, k, amplitude, color, rotation) {

  ctx.save()
  ctx.rotate(rotation)
  const arr = new Array(Math.ceil(2 * Math.PI / delTheta)).fill(0).map((val, i) => ((2 * Math.PI * delTheta) * i))

  const largestValue = arr[arr.length - 1]

  let lastX = null
  let lastY = null
  ctx.beginPath()
  ctx.lineWidth = 2;
  ctx.strokeStyle = color

  arr.forEach(val => {
    const x = amplitude * Math.cos(k * val) * Math.cos(val)
    const y = amplitude * Math.cos(k * val) * Math.sin(val)

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