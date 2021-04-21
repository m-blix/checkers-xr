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

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let el = document.createElement('a-plane');
      let color = colorA;
      if ((i%2 && j%2) || (i%2==0 && j%2==0)) {
        color = colorB;
      }
      el.setAttribute('color', color);
      el.setAttribute('height', '1');
      el.setAttribute('width', '1');
      el.setAttribute('position', {x: i - 3.5, y: j - 3.5, z: 0});
      boardEl.appendChild(el);
    }
  }
}

setup();
