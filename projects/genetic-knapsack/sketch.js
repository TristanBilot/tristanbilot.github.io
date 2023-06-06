class DNA {
    constructor(objects, MAX_WEIGHT, values_sum, mutation_rate) {
        this.initial_objetcs = objects
        this.values_sum = values_sum
        this.MAX_WEIGHT = MAX_WEIGHT
        this.mutation_rate = mutation_rate
        this.objects = this.shuffleArray(objects)
        this.actualUsedObjects = []

        this.fitness = 0
        this.usedSpace = 0
        this.value = 0
        this.actualUsedWeights = 0
    }

    shuffleArray(array) {
        var count = array.length,
            randomnumber,
            temp
        while (count) {
            randomnumber = Math.random() * count-- | 0
            temp = array[count]
            array[count] = array[randomnumber]
            array[randomnumber] = temp
        }
        return array
    }

    containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] == obj) {
                return true;
            }
        }
    
        return false;
    }

    c_fitness() {
        var w = 0
        var v = 0
        for (var i = 0; i < this.objects.length; i++) {
            if (w + this.objects[i]['weight'] <= this.MAX_WEIGHT) {
                w += this.objects[i]['weight']
                v += this.objects[i]['value']
                this.actualUsedObjects.push(this.objects[i])
                this.actualUsedWeights += this.objects[i]['weight']
            }
            else
                break
        }
        this.value = v
        this.usedSpace = w
        this.fitness = v / this.values_sum
    }



    crossover(partner) {
        var objects = []
        var i = 0
        while (objects.length < this.objects.length) {
            if (getRandomInt(0, 1) < 0.5 && !this.containsObject(this.objects[i], objects))
                objects.push(this.objects[i])
            else if (!this.containsObject(partner.objects[i], objects))
                objects.push(partner.objects[i])
            i += 1
            if (i == this.objects.length)
                i = 0
        }
        return new DNA(objects, this.MAX_WEIGHT, this.values_sum, this.mutation_rate)
    }

    mutate() {
        var l = this.objects.length
        for (var i = 0; i < l; i++) {
            var swap = getRandomInt(Math.floor(l / 2), l - 1)
            if (Math.random() < this.mutation_rate) {
                var tmp = this.objects[i]
                this.objects[i] = this.objects[swap]
                this.objects[swap] = tmp
            }
        }
    }
}

class Population {
    constructor(objects, MAX_WEIGHT) {
        this.objects = objects
        this.MAX_WEIGHT = MAX_WEIGHT
        this.genes = []
        this.mating_pool = []
        this.generations = 0
        this.best_fitness = 0
        this.best = null
        this.max_pop = 10
        this.mutation_rate = 0.01
        this.values_sum = 0

        this.c_values_sum()
        this.generate_genes()
        this.c_fitness()
    }

    generate_genes() {
        for (var i = 0; i < this.max_pop; i++) {
            this.genes.push(new DNA(
                this.objects,
                this.MAX_WEIGHT,
                this.values_sum,
                this.mutation_rate
            ))
        }
    }

    c_values_sum() {
        for (var i = 0; i < this.objects.length; i++) {
            this.values_sum += this.objects[i]["value"]
        }
    }

    c_fitness() {
        for (var i = 0; i < this.genes.length; i++) {
            this.genes[i].c_fitness()
        }
    }

    natural_selection() {
        this.mating_pool = []
        for (var i = 0; i < this.genes.length; i++) {
            var dna = this.genes[i]
            for (var i = 0; i < Math.round(dna.fitness * 100); i++) {
                this.mating_pool.push(dna)
            }
        }
    }

    new_generation() {
        this.genes = []
        for (var i = 0; i < this.mating_pool.length; i++) {
            if (i == this.max_pop)
                break
            var a = getRandomInt(0, this.mating_pool.length - 1)
            var b = getRandomInt(0, this.mating_pool.length - 1)
            var parent1 = this.mating_pool[a]
            var parent2 = this.mating_pool[b]
            var child = parent1.crossover(parent2)
            child.mutate()
            this.genes.push(child)
        }
        this.generations += 1
    }

    evaluate() {
        for (var i = 0; i < this.genes.length; i++) {
            var dna = this.genes[i]
            if (dna.fitness > this.best_fitness) {
                this.best = dna
                this.best_fitness = dna.fitness
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disp() {
}

function dispUI() {
    const objectsDiv = document.querySelector('#knapsack-objects')
    const solutionDiv = document.querySelector('#knapsack-solution-objects')
    const chosenObjects = population.best.actualUsedObjects
    const remainingObjects = population.objects.filter(e => !chosenObjects.includes(e))

    objectsDiv.innerHTML = [...remainingObjects].sort((a, b) => a.weight-b.weight).map(e => buildKnapsackObjectUI(e)).join('<br/>')
    solutionDiv.innerHTML = [...chosenObjects].sort((a, b) => a.weight-b.weight).map(e => buildKnapsackObjectUI(e)).join('<br/>')

    const objectsStatsDiv = document.querySelector('#remaining-objects-stats')
    const solutionStatsDiv = document.querySelector('#chosen-objects-stats')
    const knapsackSimulationDiv = document.querySelector('.knapsack-simulation-div')
    const knapsackStatsDiv = document.querySelector('.knapsack-stats')
    const remainingSums = getWeightAndValueSums(remainingObjects)
    const chosenSums = getWeightAndValueSums(chosenObjects)
    knapsackSimulationDiv.style.display = 'block'
    const titleStyle = `
        font-size: 16px;
        text-align:center;
        font-weight: 600;
    `
    const boldStyle = `
        font-weight: 600;
    `
    knapsackStatsDiv.innerHTML = `<span style="${boldStyle}"> Max weight:</span> ${population.MAX_WEIGHT}<br/><span style="${boldStyle}"> Mutation rate:</span> ${population.mutation_rate}<br/><span style="${boldStyle}">Generation:</span> ${population.generations}`
    solutionStatsDiv.innerHTML = `<div style="${titleStyle}">Current solution</div> <div>Total value: ${chosenSums['vSum']}</div><div>Total weight: ${chosenSums['wSum']}</div>`
    objectsStatsDiv.innerHTML = `<div style="${titleStyle}">Remaining objects</div> <div>Total value: ${remainingSums['vSum']}</div><div>Total weight: ${remainingSums['wSum']}</div>`
}

function getWeightAndValueSums(objects) {
    var vSum = 0, wSum = 0
    for (var i = 0; i < objects.length; i++) {
        vSum += objects[i].value
        wSum += objects[i].weight
    }
    return {'vSum': vSum, 'wSum': wSum}
} 

function buildKnapsackObjectUI(object) {
    const size = object.weight
    const value = object.value
    const color = object.color
    const blockStyle = `
        height: ${size}px; 
        width: ${size}px; 
        background: ${color}; 
        margin: 5px; 
        display:flex;
    `
    const textStyle = `
        color: #fff;
        margin: auto;
    `
    return `<div style="${blockStyle}"><div style="${textStyle}">${value}</div></div>`
}

function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

    const MAX_WEIGHT = 240
    // w = [20, 30, 40, 50, 60, 20, 70, 2, 100, 90, 80] // must be distinct values
    // v = [17, 33, 8, 12, 36, 9, 30, 30, 50, 45, 22]
    var p = []
    const nbIterations = 10000
    const nbObjects = 15

    var w = {}
    var v = {}
    for (var i = 0; i < nbObjects; i++) {
        rdW = getRandomInt(20, 100)
        if (!(w[rdW] in w))
            w[i] = rdW

        rdV = getRandomInt(20, 100)
            if (!(v[rdV] in v))
                v[i] = rdV
    }
    w = Object.values(w)
    v = Object.values(v)

    for (var i = 0; i < v.length; i++)
        p.push({'weight': w[i], 'value': v[i], color: randDarkColor()})
    let population = new Population(p, MAX_WEIGHT)

    var i = 1;
    function myLoop() {
        setTimeout(function() {
            population.natural_selection()
            population.new_generation()
            population.c_fitness()
            population.evaluate()
            disp()
            dispUI()

            i++;
            if (i < nbIterations) myLoop();
        }, 30)
    }
    myLoop(); 


// runSimulation()