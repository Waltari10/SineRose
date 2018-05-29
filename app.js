
var c = document.getElementById("canvas")
var ctx = c.getContext("2d")
var chroma = require('chroma-js')
const _ = require('lodash')

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
  ctx.beginPath()
  ctx.lineWidth = 2;
  ctx.strokeStyle = color

  arr.forEach(val => {
    const x = amplitude * Math.cos(k * val) * Math.cos(val)
    const y = amplitude * Math.cos(k * val) * Math.sin(val)

    const scaledVal = val / largestValue

    if (lastX && lastY) {
      ctx.moveTo(lastX, lastY)
    } 

    ctx.lineTo(x, y)
    lastX = x
    lastY = y
  })
  ctx.closePath()
  ctx.stroke()
}

var steps = 0

let color = getRandHex()
let k = _.random(2, 11)
const Sine = (phase) => Math.sin(phase * Math.PI)
const period = 10000
let startedAt = null

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function step(timestamp) {
  if (!startedAt) startedAt = timestamp

  const timePassedMS = timestamp - startedAt
  const phase = (timePassedMS % period) / period

  if (precisionRound(phase, 2) === 0.00 || precisionRound(phase, 2) === 0.01) {
    color = getRandHex()
    k = _.random(2, 11)
  }

  ctx.fillStyle = 'white'
  ctx.fillRect(-width, -height, canvas.width, canvas.height)
  steps++

  let amplitude = (height / 1.7)
  if (height > width) {
    amplitude =  (width / 1.7)
  }
  
  ctx.rotate(0.005)
  drawFlower(0.005, k, (amplitude * Sine(phase)), color)
  window.requestAnimationFrame(step)
}

step()