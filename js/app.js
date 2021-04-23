'use strict';

let $ = document.querySelector.bind(document);

let sceneEl = $('#scene');
let boardEl = $('#board');

let N = 8;
let size = 1.4;

let els = [];
let darkSquares = [];

function setup() {
  console.log('app setup');

  setupUI();

  createBoard(N, size);
  createPieces(N, size);

  setupInteraction();
}

function setupUI() {

}

function createBoard(N = 8, size = 8) {
  const colorA = '#389651';
  const colorB = '#ddd';

  let spotSize = size/N;
  let offset = spotSize * ((N-1)/2);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let el = document.createElement('a-plane');
      let color = colorA;
      if ((i%2 && j%2) || (i%2==0 && j%2==0)) {
        color = colorB;
      }
      el.setAttribute('color', color);
      el.setAttribute('height', spotSize);
      el.setAttribute('width', spotSize);
      el.object3D.position.set(i*spotSize - offset, j*spotSize - offset, 0);
      el.dataset.row = i;
      el.dataset.col = j;
      el.classList.add('raycastable');
      el.classList.add('square');
      boardEl.appendChild(el);

      els.push(el);
      if (!((i%2 && j%2) || (i%2==0 && j%2==0))) {
        darkSquares.push(el);
      }
    }
  }

  let boardH = spotSize/3;
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

  let pSize = size/N / 2 * 0.8;
  let h = pSize/2;

  for (let i = 0; i < numPiecesPerPlayer; i++) {
    let piece = document.createElement('a-cylinder');
    piece.setAttribute('radius', pSize);
    piece.setAttribute('height', h);
    piece.setAttribute('color', "#c90e0e");
    piece.setAttribute('rotation', '-90 0 0');
    piece.classList.add('raycastable');
    piece.classList.add('piece');

    let posX = darkSquares[i].getAttribute('position').x;
    let posY = darkSquares[i].getAttribute('position').y;

    piece.object3D.position.set(posX, posY, 0);
    boardEl.appendChild(piece);
  }

  for (let i = 0; i < numPiecesPerPlayer; i++) {
    let piece = document.createElement('a-cylinder');
    piece.setAttribute('radius', pSize);
    piece.setAttribute('height', h);
    piece.setAttribute('color', "#333");
    piece.setAttribute('rotation', '-90 0 0');
    piece.classList.add('raycastable');
    piece.classList.add('piece');

    let posX = darkSquares[i+20].getAttribute('position').x;
    let posY = darkSquares[i+20].getAttribute('position').y;

    piece.object3D.position.set(posX, posY, h/2);
    boardEl.appendChild(piece);
  }
}

var hoverSelection = null;
var pieceSelection = 1; // mode 0=square
let raycaster = user.components['raycaster'];

let pieceSelected = false;
let selectedPiece = null;

function setupInteraction() {
  let board = $('#board');

  board.addEventListener('click', function(e){
    let intersectedEls = raycaster.intersectedEls;
    //console.log(intersectedEls);
    if (pieceSelection) {
      let el = intersectedEls.find(function(el){ if (el.classList.contains('piece')) { return el; } });
      if (el) {
        console.log('click piece');
        selectPiece(el);
      }
    } else { // square
      let el = intersectedEls.find(function(el){ if (el.classList.contains('square')) { return el; } });
      if (el) {
        console.log('click square');
        if (selectedPiece) {
          movePieceToSquare(selectedPiece, el);
        }
      }
    }
  });

  board.addEventListener('mouseenter', function(e) {
    let intersectedEls = raycaster.intersectedEls;

    if (pieceSelection) {
      let el = intersectedEls.find(function(el){ if (el.classList.contains('piece')) { return el; } });
      if (el) {
        console.log('start piece hover');
        el.dataset.ogColor = el.getAttribute('color');
        el.setAttribute('material','color','#7295e8');
        hoverSelection = el;
      }
    } else { // square
      let el = intersectedEls.find(function(el){ if (el.classList.contains('square')) { return el; } });
      if (el) {
        console.log('start piece hover');
        el.dataset.ogColor = el.getAttribute('color');
        el.setAttribute('material','color','#7295e8');
        hoverSelection = el;
      }
    }
  });

  board.addEventListener('mouseleave', function(e) {
    if (hoverSelection && e.target != selectedPiece) {
      console.log('end hover');
      hoverSelection.setAttribute('material','color', hoverSelection.dataset.ogColor);
      hoverSelection = null;
    }
  });
}

// todo:
function selectPiece(p) {
  console.log('select piece');
  selectedPiece = p;
  pieceSelection = 0; // switch to square
  p.setAttribute('material','color', 'orange');
  p.object3D.position.z = 0.1;
}

function movePieceToSquare(piece, square) {
  console.log('movePieceToSquare');
  piece.object3D.position.x = square.object3D.position.x;
  piece.object3D.position.y = square.object3D.position.y;

  piece.object3D.position.z = 0.0;

  selectedPiece = null;
  pieceSelection = 1;
  piece.setAttribute('material', 'color', piece.dataset.ogColor);
}

setup();
