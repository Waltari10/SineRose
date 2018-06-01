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
  global.width = window.innerWidth
  global.height = window.innerHeight
  ctx.translate(0, 0)
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas, false)

var steps = 0
let startedAt = null
global.timeDelta = 16
let lastTime = 0
let timePassedMS = 0


const SimplexNoise = require('simplex-noise')

const simplex = new SimplexNoise()

let noiseX = 0



// create grass field
for (let i = 0; i < 600; i++) {

  const noise = simplex.noise2D(noiseX / 100, 0)
  noiseX++

  global.instantiate(GrassStraw, [Math.random() * (width + 50), height, (noise * 100) + 200, 7, noise + 0.5])
}
global.instantiate(FlowerPedals, [0.005])

function step(timestamp) {
  if (!startedAt) startedAt = timestamp

  if (lastTime) {
    global.timeDelta = timestamp - lastTime
  }

  timePassedMS = global.timeDelta + timePassedMS

  lastTime = timestamp

  const phase = (timePassedMS % PERIOD) / PERIOD
  global.wind = Math.sin(phase * 2 * Math.PI) + 2

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  steps++

  gameObjects.forEach(go => {
    go.update()
    go.render()
  })
  
  window.requestAnimationFrame(step)
}

step()