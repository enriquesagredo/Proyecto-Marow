const canvasId = "canvas"

const canvas = document.getElementById(canvasId)

const startButton = document.getElementById("start")

const game = new Game(canvasId)

document.addEventListener('keydown', e => {
    game.onKeyEvent(e)
  })
  
  document.addEventListener('keyup', e => {
    game.onKeyEvent(e)
  })

  // const pantallaCarga = document.getElementById('carga');

  function resetGame() {
    canvas.classList.add("hidden")
    startButton.classList.remove("hidden")
    startButton.innerHTML = "Reset Game"
    console.log ("aqui")
  }


  document.getElementById("start").addEventListener("click", ()=>{
    canvas.classList.remove("hidden")
    startButton.classList.add("hidden")
    game.start()
  })