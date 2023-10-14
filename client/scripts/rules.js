const btnHome = document.getElementById('btnHome');
let timerEnd = false;
let nameInputted = false;

const nameField = document.getElementById('nameField');
const quizSelect = document.getElementById('quiz');
quizSelect.innerHTML = '';

btnHome.onclick = () => {
  window.open('/', '_self');
};

// Update quiz select dropdown with all the quizzes that exist
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

// Don't let the user start the quiz until they input a name
// and the timeout has finished
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

// Don't let the user start until a name has been inputted
nameField.onchange = () => {
  nameInputted = true;
  enableContinue();
};

// Also wait two seconds until the user can start the quiz
setTimeout(() => {
  timerEnd = true;
  enableContinue();
}, 2000);
