import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';
import anime from 'animejs/lib/anime.es.js';
import confetti from 'canvas-confetti';

import fringe_01 from './src/assets/element-a1.png';
import fringe_02 from './src/assets/element-a2.png';
import fringe_03 from './src/assets/element-b1.png';
import fringe_04 from './src/assets/element-b2.png';
import fringe_05 from './src/assets/element-c1.png';
import fringe_06 from './src/assets/element-c2.png';

import stick from './src/assets/noun-stick.svg';

let images = [
  fringe_01,
  fringe_02,
  fringe_03,
  fringe_04,
  fringe_05,
  fringe_06
];

let counter = 0;
let achieved = false;

const container = document.querySelector('#app');

const upperDiv = document.createElement('div');
upperDiv.classList.add('upper');

const lowerDiv = document.createElement('div');
lowerDiv.classList.add('lower');

const mouseImg = document.createElement('img');
mouseImg.src = stick;
mouseImg.classList.add('mouse-img');
container.appendChild(mouseImg);

const welcomeDiv = document.createElement('div');
welcomeDiv.classList.add('welcome');
welcomeDiv.innerHTML = 'Klicke so lange, bis sich die Piñata für dich öffnet';
container.appendChild(welcomeDiv);

const messageDiv = document.createElement('div');
messageDiv.classList.add('message');
messageDiv.innerHTML = `
  <p> Have a beautiful and surprising 2024 </p>
  <p> Bas & Aer </p>
`;
container.appendChild(messageDiv);


let aspectRatio = window.innerWidth / window.innerHeight;
// let fringeLimit = Math.ceil(images.length / aspectRatio);
let fringeLimit = 12;

for (let i = 0; i < fringeLimit - images.length; i++) images.push(images[i]);


// --- methods ---

const setCounter = (count) => counter = count;

const animateStick = () => {
  anime({
    targets: mouseImg,
    rotate: ['-10deg', '10deg'],
    duration: 100,
    easing: 'easeInSine',
    direction: 'alternate',
  });

}


const insertElements = (arr, div) => {
  arr.forEach((img, i) => {
    const imgElem = document.createElement('img');
    imgElem.src = img;
    imgElem.style.bottom = `${((i * 50) - 40)}px`;
    div.appendChild(imgElem);
  });

  container.appendChild(div);
}


const updateElements = (div) => {
  div.childNodes.forEach((img, i) => {
    anime({
      targets: img,
      rotate: `${Math.floor(Math.random() * 10)-5}deg`,
      translateY: `${(counter * -20) / ((i * 0.05) + 0.8)}px`,
      duration: 400,
      easing: 'easeInOutSine',
      direction: 'alternate',
    });
  });

  // console.log(div.childNodes[0].getBoundingClientRect().y);
  if (div.childNodes[0].getBoundingClientRect().y < 0) achieved = true;
}


insertElements(images, upperDiv);
insertElements(images, lowerDiv);


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}


// --- event listeners ---

container.addEventListener('click', () => {
  updateElements(upperDiv);
  updateElements(lowerDiv);

  setCounter(counter + 1);
  animateStick();
  if (counter) welcomeDiv.style.opacity = '0';

  if (achieved) {
    confetti({
      angle: randomInRange(40, 130),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      colors: ['CF2F26', '000000', 'E3D26F', 'E88EED', 'DEF6CA']
    });

    messageDiv.style.opacity = '1';
  }

});

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  mouseImg.style.left = `calc(${x}px - 55vw)`;
  mouseImg.style.top = `${y - 20}px`;
});

document.addEventListener('touchmove', (e) => {
  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  mouseImg.style.left = `calc(${x}px - 55vw)`;
  mouseImg.style.top = `${y - 20}px`;
});

