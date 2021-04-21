'use strict';

let $ = document.getElementById.bind(document);

let sceneEl = document.getElementById('scene');
let boardEl = document.getElementById('board');

function setup() {
  console.log('app setup');
  createBoard();
}

function createBoard() {
  const colorA = '#389651';
  const colorB = '#ddd';

  const N = 8;
  const size = 8;
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
      el.setAttribute('position', {x: i - offset, y: j - offset, z: 0});
      boardEl.appendChild(el);
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

setup();
