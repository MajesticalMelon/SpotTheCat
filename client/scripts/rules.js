let timerEnd = false;
let nameInputted = false;

const nameField = document.getElementById('nameField');
const quizSelect = document.getElementById('quiz');
quizSelect.innerHTML = '';

fetch('/quizzes', {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((data) => {
  data.json().then((json) => {
    json.forEach((q) => {
      quizSelect.innerHTML += `<option value=${q}>${
        q === '' ? 'DEFAULT' : q.split('%20').join(' ')
      }</option>`;
    });
  });
});

const enableContinue = () => {
  if (timerEnd && nameInputted) {
    const button = document.getElementById('continue');
    button.disabled = false;
    button.onclick = () => {
      window.open(
        `/quiz?name=${nameField.value}${
          quizSelect.value.length === 0 ? '' : `&quiz=${quizSelect.value}`
        }`,
        '_self',
      );
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
