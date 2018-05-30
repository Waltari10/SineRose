const c = document.getElementById("canvas")
const _ = require('lodash')
const FlowerPedals = require('./FlowerPedals')
const GrassStraw = require('./GrassStraw')
const { PERIOD } = require('./constants')

global.ctx = c.getContext("2d")
global.width = window.innerWidth / 2
global.height = window.innerHeight / 2
global.wind = 0

function resizeCanvas() {
  global.width = window.innerWidth / 2
  global.height = (window.innerHeight / 2)
  ctx.translate(width, height)
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas, false)

var steps = 0
let startedAt = null
global.timeDelta = 16
let lastTime = 0
let timePassedMS = 0


const flowerPedals = new FlowerPedals(0.005)
const grassStraw = new GrassStraw(100, height, 300, 10, 1)

function step(timestamp) {
  if (!startedAt) startedAt = timestamp

  if (lastTime) {
    global.timeDelta = timestamp - lastTime
  }
  timePassedMS = global.timeDelta + timePassedMS

  lastTime = timestamp

  const phase = (timePassedMS % PERIOD) / PERIOD
  global.wind = Math.sin(phase * 2 * Math.PI) + 1

  ctx.fillStyle = 'white'
  ctx.fillRect(-canvas.width / 2, (-canvas.height / 2), canvas.width, canvas.height)
  steps++

  flowerPedals.update()
  flowerPedals.render()
  grassStraw.update()
  grassStraw.render()
  
  window.requestAnimationFrame(step)
}


step()