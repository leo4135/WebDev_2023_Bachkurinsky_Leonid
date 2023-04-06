let BODY = document.querySelector('body');

function addBlock(width, height, row) {
  let logo = document.createElement('div');
  logo.style.width = `${width}px`;
  logo.style.height = `${height}px`;
  let randomBackground = Math.floor(Math.random() * 2);
  if (randomBackground == 1) {
    logo.style.background = `#000`;
  } else {
    logo.style.background = `#eee`;
  }

  row.appendChild(logo);
}

function createRows(width, height, column, counterBlocks) {
  let row = document.createElement('div');
  row.style.width = `${width}px`;
  row.style.height = `${height}px`;
  row.style.display = 'flex';
  while (counterBlocks--) {
    addBlock(20, 20, row);
  }
  let row2 = row.cloneNode(true);
  row2.style.flexDirection = 'row-reverse';
  column.appendChild(row);
  column.appendChild(row2);
}

function createColumns(width, height, counterBlocks, block) {
  let column = document.createElement('div');
  column.style.width = `${width}px`;
  column.style.height = `${height}px`;
  column.style.display = 'flex';
  block.appendChild(column);
  createRows(60, 20, column, counterBlocks);
}

function mainBlock(counterColumns, counterBlocks) {
  let block = document.createElement('div');
  BODY.appendChild(block);
  while (counterColumns--) {
    createColumns(120, 20, counterBlocks, block);
  }
}

function AllCartoons(count) {
  while (count--) {
    mainBlock(6, 3);
  }
}
AllCartoons(20);
