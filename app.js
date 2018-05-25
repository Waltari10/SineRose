
var c = document.getElementById("canvas")
var ctx = c.getContext("2d")
var chroma = require('chroma-js')

let width = window.innerWidth / 2
let height = window.innerHeight / 2

function getRandHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function resizeCanvas() {
  width = window.innerWidth / 2
  height = window.innerHeight / 2
  ctx.translate(width, height)
}
resizeCanvas()

window.addEventListener('resize', resizeCanvas, false)

/**
 * 
 * @param {any} delTheta del_theta is the discrete step size for discretizing the continuous range of angles from 0 to 2 * pi
 * @param {any} k  petal coefficient. if k is odd then k is the number of petals. if k is even then k is half the number of petals
 * @param {any} amplitude length of each petal
 * 
 */
function drawFlower (delTheta, k, amplitude, color) {

  const arr = new Array(Math.ceil(2 * Math.PI / delTheta)).fill(0).map((val, i) => ((2 * Math.PI * delTheta) * i))

  let scale = chroma.scale(['red', 'white'])

  const largestValue = arr[arr.length - 1]

  let lastX = null
  let lastY = null
  arr.forEach(val => {
    const x = amplitude * Math.cos(k * val) * Math.cos(val)
    const y = amplitude * Math.cos(k * val) * Math.sin(val)

    const scaledVal = val / largestValue

    ctx.beginPath()
    ctx.lineWidth = 2;
    ctx.strokeStyle = color

    if (lastX && lastY) {
      ctx.moveTo(lastX, lastY)
    } 

    ctx.lineTo(x, y)
    ctx.stroke()
    lastX = x
    lastY = y
  })
}

var steps = 0

const color = getRandHex()

function step(timestamp) {
  ctx.fillStyle = 'white'
  ctx.fillRect(-width, -height, canvas.width, canvas.height)
  steps++

  let amplitude = height
  if (height > width) {
    amplitude =  width
  }
  
  ctx.rotate(0.005)
  drawFlower(0.005, 4, amplitude, color)
  window.requestAnimationFrame(step)
}

step()