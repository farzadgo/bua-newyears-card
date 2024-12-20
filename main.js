import './style.css';

import anime from 'animejs/lib/anime.es.js';
import confetti from 'canvas-confetti';

import fringe_01 from './src/assets/element-a1.webp';
import fringe_02 from './src/assets/element-a2.webp';
import fringe_03 from './src/assets/element-b1.webp';
import fringe_04 from './src/assets/element-b2.webp';
import fringe_05 from './src/assets/element-c1.webp';
import fringe_06 from './src/assets/element-c2.webp';
import logo from './src/assets/B&A_Logo_RGB.svg';
import stick from './src/assets/noun-pointer.svg';
import schlag from './src/assets/Schlag.mp3';
import tadaal from './src/assets/TadaaI.mp3';
import tadaall from './src/assets/TadaaII.mp3';
import rascheln from './src/assets/Rascheln.mp3';

let images = [
  fringe_01,
  fringe_02,
  fringe_03,
  fringe_04,
  fringe_05,
  fringe_06
];

const sounds = {
  schlag: new Audio(schlag),
  tadaal: new Audio(tadaal),
  tadaall: new Audio(tadaall),
  rascheln: new Audio(rascheln),
};



let newYearWishes = [
  { quote: "Wir wünschen uns eine Welt, in der jede Person so sein darf, wie sie möchte.", person: "Anonymous" },
  { quote: "Ein glückliches und gesundes neues Jahr!", person: "Anonymous" },
  { quote: "Alles Gute für das neue Jahr!", person: "Anonymous" },
  { quote: "Möge das neue Jahr dir Freude und Erfolg bringen!", person: "Anonymous" },
  { quote: "Ein erfolgreiches und glückliches neues Jahr!", person: "Anonymous" },
  { quote: "Viel Glück und Gesundheit im neuen Jahr!", person: "Anonymous" },
  { quote: "Möge das neue Jahr all deine Wünsche erfüllen!", person: "Anonymous" },
  { quote: "Ein frohes und gesegnetes neues Jahr!", person: "Anonymous" },
  { quote: "Auf ein fantastisches neues Jahr!", person: "Anonymous" },
  { quote: "Ein glückliches neues Jahr voller neuer Chancen!", person: "Anonymous" }
];

let counter = 1;
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
welcomeDiv.innerHTML = 'Öffne die Piñata durch Klicken';
container.appendChild(welcomeDiv);

const containerDiv = document.createElement('div');
containerDiv.classList.add('container');
container.appendChild(containerDiv);

const logoElement = document.createElement('img');
logoElement.src = logo;

const subtitleElement = document.createElement('p');
subtitleElement.innerHTML = 'Everything is better together';

const headerDiv = document.createElement('div');
headerDiv.classList.add('header');

headerDiv.appendChild(logoElement);
headerDiv.appendChild(subtitleElement);
containerDiv.appendChild(headerDiv);

const messageDiv = document.createElement('div');
messageDiv.classList.add('message');
let randomWish = newYearWishes[Math.floor(Math.random() * newYearWishes.length)];
messageDiv.innerHTML = `
  <p>${randomWish.quote}</p>
  <p>- ${randomWish.person}</p>
`;

containerDiv.appendChild(messageDiv);


const footerDiv = document.createElement('div');
footerDiv.classList.add('footer');
footerDiv.innerHTML = `
  <p> Join us, work with us, say hello</p>
  <a href="https://www.basandaer.com" target="_blank"> www.basandaer.com </a>
`;
containerDiv.appendChild(footerDiv);

// let aspectRatio = window.innerWidth / window.innerHeight;
// let fringeLimit = Math.ceil(images.length / aspectRatio);
let fringeLimit = 14;

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
    imgElem.setAttribute('loading', 'lazy');
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
  if (div.childNodes[0].getBoundingClientRect().y < (window.innerHeight * 0.01)) achieved = true;
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

 
  const newHitSound = new Audio(sounds['schlag'].src);
  newHitSound.currentTime = 0;
  newHitSound.play();

  if (!achieved) {
    const newMoveSound = new Audio(sounds['rascheln'].src);
    newMoveSound.volume = 0.05;
    newMoveSound.currentTime = 0;
    newMoveSound.play();
  }

  if (achieved) {
    confetti({
      angle: randomInRange(40, 130),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      colors: ['CF2F26', '000000', 'E3D26F', 'E88EED', 'DEF6CA']
    });

    const tadaaSound = Math.random() > 0.5 ? sounds.tadaal : sounds.tadaall;
    tadaaSound.play();

    messageDiv.style.opacity = '1';
  }

});

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  mouseImg.style.left = `calc(${x}px - 42vw)`;
  mouseImg.style.top = `${y - 20}px`;
});
 
document.addEventListener('touchmove', (e) => {
  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  mouseImg.style.left = `calc(${x}px - 42dvw)`;
  mouseImg.style.top = `${y - 20}px`;
});
