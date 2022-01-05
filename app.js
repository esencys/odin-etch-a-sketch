const main = () => {
  const app = document.getElementById("app");
  const resetButton = createResetButtonElement();
  const grid = createGridElement();

  clearExistingChildren();

  app.appendChild(resetButton);
  app.appendChild(grid);

  gridLoop();
}

const clearExistingChildren = () => {
  const app = document.getElementById("app");

  while (app.children.length > 0) {

    for (let i = 0; i < app.children.length; i++) {
      app.children[i].remove();
    }
  }
} 

const createResetButtonElement = () => {
  const resetButton = document.createElement("button");
  resetButton.innerText = "reset board";
  resetButton.classList.add("reset-button");
  resetButton.id = "reset";
  resetButton.onclick = main;

  return resetButton;
}

const createGridElement = () => {
  const grid = document.createElement("div");
  grid.classList.add("grid-container");
  grid.id = "grid";
  
  return grid;
}

const gridLoop = () => {
  let withinBounds = false;
  let gridSize;

  while (!withinBounds) {
    gridSize = parseInt(prompt("What is the grid size you desire?")); 
    if (isWithinBounds(gridSize)) {
      withinBounds = true;
      break;
    }
    if (gridSize === 0) {
      break;
    }
  }

  const gridItems = createListGridItems(gridSize);
  populateGrid(gridItems);
}

const isWithinBounds = (gridSize) => {
  return gridSize > 0 && gridSize <= 100;
}

const createListGridItems = (gridSize) => {
  listGridItems = [];
  let count = 0;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      dataId = `${i}, ${j}`;
      gridItem = createGridItem(dataId);
      listGridItems.push(gridItem);
    }
  }

  return listGridItems;
}

const createGridItem = (dataId) => {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");
  gridItem.setAttribute('data-id', dataId);
  gridItem.id = dataId;

  gridItem.addEventListener("mouseover", (e) => mouseOverGridItem(e));

  return gridItem;
}

const mouseOverGridItem = (e) => {
  e.stopPropagation();
  
  const currentGridItem = document.getElementById(`${e.target.dataset.id}`)

  currentGridItem.style.backgroundColor = "black";
}

const populateGrid = (gridItems) => {
  const grid = document.getElementById("grid");
  grid.style["grid-template-columns"] = calcGridCols(gridItems.length ** (1/2));
    
  gridItems.forEach((gridItem) => {
    grid.appendChild(gridItem);
  })
}

const calcGridCols = (gridSize) => {
  output = "";

  for (let i = 0; i < gridSize; i++) {
    output += "auto ";
  }
  
  return output
}

main();

