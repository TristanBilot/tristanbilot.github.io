var nbCities = 15;
var mutationRate = 0.01;
let maxPop = nbCities * nbCities;
let cities = [];
let labelsPlaced;

let width = 600;
let height = 400;

/* UI */
let generationslabel;
let fitnesslabel;
let bestpointslabel;
let shortestpathlabel;
let mutationInput;
let nodesInput;
let button;

function setup() {
    let cnv = createCanvas(500, 500, WEBGL);
    cnv.position(50, 180);
    noStroke();
    fill(255, 102, 204);
  setupSketch();
}

function setupSketch() {
  labelsPlaced = false;
  initDOM();
  generateCities();
  population = new Population(cities, maxPop, mutationRate);
}

/* Program loop */
function draw() {
  background(255);
  genetic();
  drawCities();
  disp();

  if (!labelsPlaced)
    drawLabels();
  if (population.isFinished())
      noLoop();
}

function drawLabels() {
    labelsPlaced = true;
    var i = 65;
    population.bestPoints().forEach((e) => {
        let city = cities[e];
        let cityChar = createLabel(String.fromCharCode(i));
        cityChar.class("cityLabel");
        cityChar.position(city.x + (width/2) - 5, city.y + (height/2) + 195);
        i++;
    });
}

function drawCities() {
    beginShape(LINES);
    fill(220);
    stroke(70);

    population.bestPoints().forEach((e) => {
        let city = cities[e];
        ellipse(city.x, city.y, 13, 13);
    });
    endShape();
}

/* Main algorithm */
function genetic() {
    population.naturalSelection();
    population.newGeneration();
    population.fitness();
    population.evaluate();
}

function disp() {
    strokeWeight(3);
    stroke(237, 34, 93);
    beginShape(LINES);
    let p = population.bestPoints();
    for (let i = 0; i < population.bestPoints().length - 1; i++) {
        let curr = cities[p[i]];
        let next =cities[p[i+1]];
        line(curr.x, curr.y, next.x, next.y);
    }
    endShape();
    bestpointslabel.html("Best nodes: " + population.bestPoints());
    fitnesslabel.html("Best fit: " + population.bestFitness.toFixed(4));
    generationslabel.html("Generations: " + population.generations);
    shortestpathlabel.html("Shortest path length: " + population.getBestPath());
}

/* Initial points generation */
function generateCities() {
    var arr = [];
    for (let i = 0; i < nbCities; i++) {
        let x = floor(random(-width/3, width/3));
        let y = floor(random(-height/2, height/2));
        arr.push({x: x, y: y});
    }
    cities = arr;
}

function createLabel(label = '') {
  const p = createP(label);
  p.addClass('tsp-label');
  return p;
}

function initDOM() {
  createDiv().style('height: 550px');
  generationslabel = createLabel();
  fitnesslabel = createLabel();
  bestpointslabel = createLabel();
  shortestpathlabel = createLabel();

  createDiv().style('height: 40px');

  createLabel('Number of nodes').style('font-weight: bold');
  nodesInput = createInput(`${nbCities}`, ['number']);
  nodesInput.style('width: 60px');

  createDiv().style('height: 20px');

  createLabel('Mutation rate (%)').style('font-weight: bold');
  mutationInput = createInput(`${mutationRate * 100}`, ['number']);
  mutationInput.style('width: 60px');

  createDiv().style('height: 20px');

  button = createButton('update');
  button.mousePressed(onBtnPressed);

  createDiv().style('height: 20px');
}

function deinitDOM() {
  generationslabel = remove();
  fitnesslabel = remove();
  bestpointslabel = remove();
  shortestpathlabel = remove();
}

function onBtnPressed() {
    nbCities = int(nodesInput.value());
    mutationRate = int(mutationInput.value()) / 100;
    removeElements();
    setupSketch();
}
