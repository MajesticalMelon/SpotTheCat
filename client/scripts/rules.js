let timerEnd = false;
let nameInputted = false;

const nameField = document.getElementById('nameField');

const enableContinue = () => {
  if (timerEnd && nameInputted) {
    const button = document.getElementById('continue');
    button.disabled = false;
    button.onclick = () => {
      window.open(`/quiz?name=${nameField.value}`, '_self');
    };
  }
};

nameField.onchange = () => {
  nameInputted = true;
  enableContinue();
};

setTimeout(() => {
  timerEnd = true;
  enableContinue();
}, 2000);
