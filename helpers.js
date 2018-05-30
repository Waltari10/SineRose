
function getRandHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const sine = (phase) => Math.sin(phase * Math.PI)

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

module.exports = {
  sine,
  getRandHex,
  precisionRound
}