'use strict';

let $ = document.querySelector.bind(document);

let sceneEl = $('#scene');
let boardEl = $('#board');

let N = 8;
let size = 8;

let els = [];
let darkSquares = [];

function setup() {
  console.log('app setup');

  setupUI();

  createBoard(N, size);
  createPieces(N, size);

  let piece = $('#board');
  piece.addEventListener('click', function(e){
    console.log('click piece');
  });
  piece.addEventListener('mouseenter', function(e) {
    console.log('start hover');
    e.target.dataset.ogColor = e.target.getAttribute('color');
    e.target.setAttribute('material','color','#7295e8');
  });
  piece.addEventListener('mouseleave', function(e) {
    console.log('end hover');
    e.target.setAttribute('material','color', e.target.dataset.ogColor);
  });
}

function setupUI() {

}

function createBoard(N = 8, size = 8) {
  const colorA = '#389651';
  const colorB = '#ddd';

  let offset = size/2 - 0.5; //

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let el = document.createElement('a-plane');
      let color = colorA;
      if ((i%2 && j%2) || (i%2==0 && j%2==0)) {
        color = colorB;
      }
      el.setAttribute('color', color);
      el.setAttribute('height', size/N);
      el.setAttribute('width', size/N);
      el.object3D.position.set(i - offset, j - offset, 0);
      el.dataset.row = i;
      el.dataset.col = j;
      boardEl.appendChild(el);

      els.push(el);
      if (!((i%2 && j%2) || (i%2==0 && j%2==0))) {
        darkSquares.push(el);
      }
    }
  }

  let boardH = 0.2;
  let borderEl = document.createElement('a-box');
  borderEl.setAttribute('color', '#333');
  borderEl.setAttribute('width', size*1.05);
  borderEl.setAttribute('height', size*1.05);
  borderEl.setAttribute('depth', boardH);
  borderEl.setAttribute('position', {x: 0, y: 0, z: -boardH*0.51 });
  boardEl.appendChild(borderEl);
}

function createPieces(N = 8, size = 8) {
  const numPiecesPerPlayer = 12;


  for (let i = 0; i < numPiecesPerPlayer; i++) {
    let piece = document.createElement('a-cylinder');
    piece.setAttribute('radius', 0.4);
    piece.setAttribute('height', 0.2);
    piece.setAttribute('color', "#c90e0e");
    piece.setAttribute('rotation', '-90 0 0');
    piece.classList.add('raycastable');

    let posX = darkSquares[i].getAttribute('position').x;
    let posY = darkSquares[i].getAttribute('position').y;

    piece.object3D.position.set(posX, posY, 0);
    boardEl.appendChild(piece);
  }

  for (let i = 0; i < numPiecesPerPlayer; i++) {
    let piece = document.createElement('a-cylinder');
    piece.setAttribute('radius', 0.4);
    piece.setAttribute('height', 0.2);
    piece.setAttribute('color', "#333");
    piece.setAttribute('rotation', '-90 0 0');
    piece.classList.add('raycastable');

    let posX = darkSquares[i+20].getAttribute('position').x;
    let posY = darkSquares[i+20].getAttribute('position').y;

    piece.object3D.position.set(posX, posY, 0);
    boardEl.appendChild(piece);
  }
}

setup();
