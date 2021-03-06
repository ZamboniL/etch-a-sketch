
let content = document.querySelector('.content');
let sketchMode = 'rainbow'

//Create the first grid
createGrid(16, content);

let gridButton = document.getElementById('grid-size');
gridButton.addEventListener('input', () => {
    let newValue = gridButton.value;
    let target = document.querySelector('.grid-size-value');
    target.textContent = 'Grid Size: ' + ('00' + newValue).slice(-2);
});
// on click recreate the grid with a new size
gridButton.addEventListener('click', resizeGrid)
gridButton.addEventListener('touchend', resizeGrid)
function resizeGrid() {
    let gridSize = gridButton.value;
    createGrid(gridSize, content);
}



// Create a grid of divs on container in a size of gridSize X gridSize
function createGrid(gridSize, container) {
    
    // Clean old grid out
    while (container.firstChild) {
        container.firstChild.remove()
    }

    container.style.display = 'grid';
    container.style.gridTemplate = `repeat(${gridSize}, 1fr) /
                                    repeat(${gridSize}, 1fr)`

    let i = 0;
    while (i < (gridSize * gridSize)) {
        let div = document.createElement('div');
        div.className = 'grid-node'
        div.style.background = '#fff'
        container.appendChild(div);
        i++;
    }
    gridNodes = document.querySelectorAll('div.grid-node');
    gridPaint(gridNodes);

}

// Change sketch mode on radio button click
let sketchModeSelector = document.querySelectorAll('input[name="SketchMode"');
sketchModeSelector.forEach((input) => {
    input.addEventListener('click', () => {
        sketchMode = input.id;
    })
});

// Paint the grid according to mouse position and the sketch mode selected
function gridPaint(nodes) {
    nodes.forEach((div) => {
        div.addEventListener('mouseover', () => {
            let node = div;
            changeColor(node);
        });
        div.addEventListener('touchstart', () => {
            let node = div;
            changeColor(node);
        })
    });
}

function changeColor(node) {
    if (node.className !='painted' && sketchMode == 'rainbow'){
        node.style.background = rainbow();
        node.className = 'painted';
    }
    else if (sketchMode == 'black') {
        node.style.background = '#000'
    }
    else if (node.className !='painted-gray' && sketchMode == 'grayscale') {
        node.style.background = '#CCC'
        node.className = 'painted-gray';
    }
    else if (sketchMode == 'eraser') {
        node.style.background = '#FFF'
        node.className = 'erased'
    }
    else {
        currentColor = node.style.background;
        node.style.background = darken(currentColor);
    }
}

// Pick a random color value
function rainbow() {
    let newColor = Math.floor(Math.random() * 16777215).toString(16);
    newColor = "#" + ("000000" + newColor).slice(-6);
    return newColor;
}

// Darken the color by 50%
function darken(color) {

    color = color.substring(color.indexOf('(') + 1, color.indexOf(')')).split(',');
    
    red = color[0];
    green = color[1];
    blue = color[2];
    shadeFactor = 5 / 10;

    red *= shadeFactor;
    green *= shadeFactor;
    blue *= shadeFactor;

    return `rgb(${red}, ${green}, ${blue})`;
}