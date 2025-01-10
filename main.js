import './style.css';

import anime from 'animejs/lib/anime.es.js';
import confetti from 'canvas-confetti';

import fringe_01 from './src/assets/element-a1.webp';
import fringe_02 from './src/assets/element-a2.webp';
import fringe_03 from './src/assets/element-b1.webp';
import fringe_04 from './src/assets/element-b2.webp';
import fringe_05 from './src/assets/element-c1.webp';
import fringe_06 from './src/assets/element-c2.webp';
import welcomeBackground from './src/assets/250108_NK_Schild_ah.svg';
import logo from './src/assets/B&A_Logo_RGB.svg';
import stick from './src/assets/noun-pointer.svg';
import schlag from './src/assets/Schlag-s.mp3';
import tadaal from './src/assets/TadaaI.mp3';
import tadaall from './src/assets/TadaaII.mp3';
import rascheln from './src/assets/Rascheln-v.mp3';

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

sounds['rascheln'].volume = 0.4;


let newYearWishes = [
  { quote: "Wann, wenn nicht jetzt?" },
  { quote: "Mono(tasking) statt Multi(tasking)." },
  { quote: "Wir wünschen uns eine Welt, in der jede Person so sein darf, wie sie möchte." },
  { quote: "Im Winter immer warme Finger und im Sommer ausreichend Eiscreme im Kühlschrank!" },
  { quote: "Pause vom Bullshit Bingo!" },
  { quote: "Wenn es nicht okay ist, ist das auch okay." },
  { quote: "Finde raus, was zu tun ist, gehe raus und mache die Arbeit!" },
  { quote: "May creativity flow endlessly." },
  { quote: "Selbst kleine Änderungen von Ausgangssituationen können zu radikal anderen Endzuständen führen." },
  { quote: "Für 2025 eine ausgewogene Mischung aus Aufregung und Stabilität." },
  { quote: "Stark machen und gemeinsam mit Spaß weiterhin auf Reise sein." },
  { quote: "Falling is reverse flying – flying is reverse falling. Safe landings!" },
  { quote: "Wie ist ein friedliches Zusammenleben in Vielfalt auf einem begrenzten Planeten möglich?" },
  { quote: "Immer ein kleines kühles Getränk, voluminöses Haar und dass wir uns bald mal live sehen!" },
  { quote: "Mut, auch mal Nein zu sagen und anzuecken!" },
  { quote: "Ich wünsche mir das Durchbrechen oder Anheben von Glasdeckeln. Mehr Leichtigkeit!" },
  { quote: "Stell dir vor, es würde dir stets ein Ventilator frische Luft entgegenblasen." },
  { quote: "Wir wünschen Allen ein gelassenes Rudern!" },
  { quote: "Aprender a estar quieta." },
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
welcomeDiv.innerHTML = 'The Pinata 2025</br> Click to open';
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
//let randomWish = newYearWishes[8];
messageDiv.innerHTML = `
  <p>${randomWish.quote}</p>
`;

containerDiv.appendChild(messageDiv);


const footerDiv = document.createElement('div');
footerDiv.classList.add('footer');
footerDiv.innerHTML = `
  <p> Join us, work with us, say hello</p>
  <a href="https://www.basundaer.de" target="_blank"> www.basundaer.de </a>
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
      duration: 600,
      easing: 'easeInOutSine',
      direction: 'alternate',
    });
  });

  if (div.childNodes[0].getBoundingClientRect().y < -(div.childNodes[0].getBoundingClientRect().height * 0.4)) achieved = true;
}


insertElements(images, upperDiv);
insertElements(images, lowerDiv);


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}


// --- event listeners ---

container.addEventListener('click', () => {


  setCounter(counter + 1);
  animateStick();
  if (counter) welcomeDiv.style.opacity = '0';

  //playSound('schlag');
  const newHitSound = new Audio(sounds['schlag'].src);
  newHitSound.currentTime = 0;
  newHitSound.play(); 

  if (!achieved) {
    setTimeout(() => {
      const newMoveSound = new Audio(sounds['rascheln'].src);
      newMoveSound.volume = 0.05;
      newMoveSound.currentTime = 0;
      newMoveSound.play(); 
      updateElements(upperDiv);
      updateElements(lowerDiv);
    }, 200); // 200 milliseconds delay (adjust this value as needed)
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

// Prevent pinch-to-zoom and double-tap to zoom, but allow normal clicks
document.body.addEventListener('touchstart', function(event) {
  // Disable zooming by checking if there are two touch points (pinch-to-zoom)
  if (event.touches.length > 1) {
      event.preventDefault(); // Prevent zooming behavior
  }
}, { passive: false });

document.body.addEventListener('touchmove', function(event) {
  // Prevent zooming when there are multiple touch points (pinch-to-zoom)
  if (event.touches.length > 1) {
      event.preventDefault(); // Prevent zooming behavior
  }
}, { passive: false });