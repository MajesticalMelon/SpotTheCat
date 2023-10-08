const playButton = document.getElementById('playButton');
const createButton = document.getElementById('createButton');

playButton.onclick = () => {
  window.open('/rules', '_self');
};

createButton.onclick = () => {
  window.open('/create', '_self');
};
