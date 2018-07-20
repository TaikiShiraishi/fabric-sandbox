/* eslint no-undef: 0 */
console.log('load main js');

const canvas = new fabric.Canvas('canvas', { selection: false });
const grid = 50;

// create grid
const gridNum = 600 / grid;
let i = 0;
do {
  let j = 0;
  do {
    canvas.add(
      new fabric.Rect({
        left: i * grid,
        top: j * grid,
        width: 5,
        height: 5,
        fill: '#000',
        originX: 'left',
        originY: 'top',
        centeredRotaion: true,
        selectable: false
      })
    );
    j += 1;
  } while (j < gridNum);
  i += 1;
} while (i < gridNum);

// add objects
canvas.add(
  new fabric.Rect({
    left: 100,
    top: 100,
    width: 50,
    height: 50,
    fill: '#faa',
    strokeWidth: 5,
    stroke: 'rgba(100,200,200,0.5)',
    originX: 'left',
    originY: 'top',
    snapAngle: 45,
    centeredRotaion: true
  })
);

canvas.add(
  new fabric.Circle({
    left: 300,
    top: 300,
    radius: 50,
    fill: '#9f9',
    originX: 'left',
    originY: 'top',
    snapAngle: 45,
    centeredRotaion: true
  })
);

const line = new fabric.Line([50, 50, 100, 50], {
  stroke: '#ccc',
  strokeWidth: 5,
  originX: 'left',
  originY: 'top',
  snapAngle: 45,
  centeredRotaion: true
});
line.setControlsVisibility({
  bl: false,
  br: false,
  tl: false,
  tr: false,
  mt: false,
  mb: false
});

canvas.add(line);

// snap to grid
canvas.on('object:moving', options => {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

const addRectButton = document.getElementById('add');
addRectButton.addEventListener('click', () => {
  canvas.add(
    new fabric.Rect({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      fill: '#000',
      strokeWidth: 5,
      stroke: 'rgba(100,100,200,0.5)',
      originX: 'left',
      originY: 'top',
      snapAngle: 45,
      centeredRotaion: true
    })
  );
});

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => {
  const targets = canvas.getActiveObjects();
  targets.forEach(target => {
    canvas.remove(target);
  });
});

const canvasWrap = document.getElementById('canvasWrap');
canvasWrap.tabIndex = 1000;
canvasWrap.addEventListener('keydown', e => {
  const { keyCode } = e;
  const isDelete = keyCode === 46;
  if (isDelete) {
    const targets = canvas.getActiveObjects();
    targets.forEach(target => {
      canvas.remove(target);
    });
  }
});

const rotateButton = document.getElementById('rotate');
rotateButton.addEventListener('click', () => {
  const targets = canvas.getActiveObjects();
  console.log(targets);
  targets.forEach(target => {
    target.set({
      angle: target.angle + 90
    });
  });
});
