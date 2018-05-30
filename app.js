const c = document.getElementById("canvas")
const _ = require('lodash')
const FlowerPedals = require('./FlowerPedals')
const drawGrassStraw = require('./GrassStraw')
const { PERIOD } = require('./constants')

global.ctx = c.getContext("2d")
global.width = window.innerWidth / 2
global.height = window.innerHeight / 2

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

let wind = 0

// const arr = ['timestamp', 'phase', 'wind']
// setInterval(() => {
//   const keys = ['timestamp', 'phase', 'wind']
//   const csv = `${keys.join(',')}\n${arr.map(row => keys.map(key => row[key] || '').join(',')).join('\n')}`
//   console.log(csv)
// }, 10000)

const flowerPedals = new FlowerPedals(0.005)

function step(timestamp) {
  if (!startedAt) startedAt = timestamp

  if (lastTime) {
    global.timeDelta = timestamp - lastTime
  }

  lastTime = timestamp

  const phase = (this.timePassedMS % PERIOD) / PERIOD
  wind = Math.sin(phase * 2 * Math.PI) + 1

  ctx.fillStyle = 'white'
  ctx.fillRect(-canvas.width / 2, (-canvas.height / 2), canvas.width, canvas.height)
  steps++

  flowerPedals.update()
  flowerPedals.render()
  
  drawGrassStraw(100, height, 300, 50, wind)
  drawGrassStraw(0, height, 300, 50, wind)
  window.requestAnimationFrame(step)
}


step()