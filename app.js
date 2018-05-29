console.log('starting...')

var c = document.getElementById("canvas")
global.ctx = c.getContext("2d")
var chroma = require('chroma-js')
const _ = require('lodash')
const drawFlowerPedals = require('./FlowerPedals')
const drawGrassStraw = require('./GrassStraw')
const { PERIOD } = require('./constants')
var perlin = require('perlin-noise');

const noise = perlin.generatePerlinNoise(480, 480);

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

var steps = 0

let color = getRandHex()
let k = _.random(2, 11)
const Sine = (phase) => Math.sin(phase * Math.PI)
let startedAt = null
let rotation = 0
let timeDelta = 16
let lastTime = 0

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

let wind = 0

function step(timestamp) {
  if (!startedAt) startedAt = timestamp

  if (lastTime) {
    timeDelta = timestamp - lastTime
  }

  lastTime = timestamp

  const timePassedMS = timestamp - startedAt
  const phase = (timePassedMS % PERIOD) / PERIOD


  wind = Math.sin(phase * Math.PI) + 1 
  
  rotation = (timeDelta * 0.0007) + rotation

  if (precisionRound(phase, 2) === 0.00) {
    color = getRandHex()
    k = _.random(2, 11)
  }

  ctx.fillStyle = 'white'
  ctx.fillRect(-canvas.width / 2, (-canvas.height / 2), canvas.width, canvas.height)
  steps++

  let amplitude = (height / 1.7)
  if (height > width) {
    amplitude =  (width / 1.7)
  }
  
  drawFlowerPedals(0.005, k, (amplitude * Sine(phase)), color, rotation)
  drawGrassStraw(100, height, 300, 50, wind)
  drawGrassStraw(0, height, 300, 50, wind)
  window.requestAnimationFrame(step)
}


step()