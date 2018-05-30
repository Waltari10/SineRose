const c = document.getElementById("canvas")
const _ = require('lodash')
const FlowerPedals = require('./FlowerPedals')
const GrassStraw = require('./GrassStraw')
const { PERIOD } = require('./constants')


const gameObjects = []

global.ctx = c.getContext("2d")
global.width = window.innerWidth / 2
global.height = window.innerHeight / 2
global.wind = 0
global.instantiate = function(template, args) {
  gameObjects.push(new template(...args))
}


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


global.instantiate(FlowerPedals, [0.005])
global.instantiate(GrassStraw, [100, height, 300, 10, 1])

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

  gameObjects.forEach(go => {
    go.update()
    go.render()
  })
  
  window.requestAnimationFrame(step)
}

step()