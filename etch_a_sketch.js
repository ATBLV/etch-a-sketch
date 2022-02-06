console.log("Project: Etch-A-Sketch");

let gridSize;
if (gridSize === undefined) { gridSize = 10 };

createGrid(gridSize);
initGridListener();
displayGridSize();

function createGrid(gridSize) {
    let templateArea = '1fr ';
    let strRepeat;
    let grid = document.getElementById('grid');
    for (let i = 0; i < gridSize ** 2; i++) {
        grid.insertAdjacentElement('beforeend', document.createElement('div'));
    }
    grid.style.gridTemplateAreas = `"${templateArea.repeat(gridSize)}"`;
    document.querySelectorAll('#grid>div').forEach(x => x.style.opacity = "1");
    document.querySelectorAll('#grid>div').forEach(x => x.style.backgroundColor = "orange");
}

function displayGridSize() {
    let size = document.getElementById('size');
    if (size === null) {
        document.getElementById('grid').insertAdjacentElement('beforebegin', document.createElement('h4'));
        document.querySelector('h4').id = "size";
        document.querySelector('h4').innerHTML = `${gridSize}x${gridSize}`;
        document.querySelector('h4').setAttribute("style", "text-align: center;");
    } else {
        size.innerHTML = `${gridSize}x${gridSize}`;
        size.setAttribute("style", "text-align: center;");
    }
}

function resetGrid() {
    document.querySelectorAll('#grid>div').forEach(clear => clear.style.backgroundColor = "");
    document.getElementById('grid').innerHTML = "";
    gridSize = Number(prompt("Enter size of grid"));
    while ((gridSize > 64) || ((isNaN(gridSize)))) {
        gridSize = Number(prompt("Enter a number from 1 to 64."));
    }
}

document.addEventListener('click', function (event) {
    if (event.target && event.target.id == 'reset') {
        resetGrid();
        createGrid(gridSize);
        initGridListener();
        displayGridSize();
    }
});

function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}

let resetButton = document.createElement('button');
resetButton.innerText = "Reset";
document.getElementsByTagName('h1')[0].insertAdjacentElement('afterend', resetButton);
resetButton.id = "reset";
document.getElementById('reset').classList.add(
    'btn',
    'btn-primary',
    'waves-effect',
    'waves-light'
);

css(resetButton, {
    'display': 'block',
    'margin': 'auto',
    'width': '120px',
    'filter': 'drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))'
});

function initGridListener() {
    let gridDiv = document.querySelectorAll("#grid>div");
    gridDiv.forEach(gridDiv => gridDiv.addEventListener('mouseover', function (event) {
        event.target.style.opacity = Number(event.target.style.opacity) - 0.2;
    }, false));
}