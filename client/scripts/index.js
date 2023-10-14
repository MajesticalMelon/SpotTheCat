const playButton = document.getElementById('playButton');
const createButton = document.getElementById('createButton');
const aboutButton = document.getElementById('aboutButton');
const scoresButton = document.getElementById('scoresButton');

playButton.onclick = () => {
  window.open('/rules', '_self');
};

createButton.onclick = () => {
  window.open('/create', '_self');
};

aboutButton.onclick = () => {
  window.open('/about', '_self');
};

scoresButton.onclick = () => {
  window.open('/scores', '_self');
};
