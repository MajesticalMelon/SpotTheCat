const playButton = document.getElementById('playButton');
const createButton = document.getElementById('createButton');
const aboutButton = document.getElementById('aboutButton');

playButton.onclick = () => {
  window.open('/rules', '_self');
};

createButton.onclick = () => {
  window.open('/create', '_self');
};

aboutButton.onclick = () => {
  window.open('/about', '_self');
};
