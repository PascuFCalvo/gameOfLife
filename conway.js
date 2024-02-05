var sizeX = 60;
var sizeY = 30;
var generation = 0;
var htmlElements;
var cells;
var muerta = 0;
var ALIVE = 1;

const empezar = document.getElementById("empezar");
empezar.addEventListener("click", init);

const parar = document.getElementById("parar");
parar.addEventListener("click", pararJuego);

function pararJuego() {
  location.reload();
}

function createField() {
  htmlElements = [];
  cells = [];
  var table = document.getElementById("field");
  for (var y = 0; y < sizeY; y++) {
    var tr = document.createElement("tr");

    var tdElements = [];
    cells.push(new Array(sizeX).fill(muerta));
    htmlElements.push(tdElements);
    table.appendChild(tr);
    for (var x = 0; x < sizeX; x++) {
      var td = document.createElement("td");
      tdElements.push(td);
      tr.appendChild(td);
    }
  }
}

function draw() {
  for (var y = 0; y < sizeY; y++) {
    for (var x = 0; x < sizeX; x++) {
      htmlElements[y][x].setAttribute(
        "class",
        "cell " + (cells[y][x] == 1 ? "viva" : "muerta")
      );
    }
  }
}

function countvecinos(x, y) {
  var count = 0;
  for (dy = -1; dy <= 1; dy++) {
    for (dx = -1; dx <= 1; dx++) {
      var nx = (x + dx + sizeX) % sizeX,
        ny = (y + dy + sizeY) % sizeY;
      count = count + cells[ny][nx];
    }
  }
  return count - cells[y][x];
}

function newGeneration() {
  var newCells = [];
  for (var i = 0; i < sizeX; i++) {
    newCells.push(new Array(sizeX).fill(muerta));
  }
  for (var y = 0; y < sizeY; y++) {
    for (var x = 0; x < sizeX; x++) {
      var vecinos = countvecinos(x, y);
      if (cells[y][x] == muerta && vecinos == 3) {
        newCells[y][x] = ALIVE;
      }
      if (cells[y][x] == ALIVE && (vecinos == 2 || vecinos == 3)) {
        newCells[y][x] = ALIVE;
      }
    }
  }
  generation++;
  document.getElementById("generation").innerHTML = "GENERACION: " + generation;
  document.getElementById("generation").style.color = "white";
  document.getElementById("population").innerHTML =
    "VIVAS: " + cells.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0);
  cells = newCells;
  document.getElementById("population").style.color = "white";

  draw();
}

function init() {
  createField();
  for (var i = 0; i < Math.floor(sizeX * sizeY * 0.5); i++) {
    var x, y;
    do {
      (x = Math.floor(Math.random() * sizeX)),
        (y = Math.floor(Math.random() * sizeY));
      if (cells[y][x] == muerta) {
        cells[y][x] = ALIVE;
        break;
      }
    } while (true);
  }
  draw();
  setInterval(newGeneration, 200);
}
