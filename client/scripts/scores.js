const allScoresList = document.getElementById('lsAllScores');
const noScoresText = document.getElementById('noScores');
const quizSelect = document.getElementById('quizSelect');
const btnHome = document.getElementById('btnHome');
let currentQuiz;

btnHome.onclick = () => {
  window.open('/', '_self');
};

// Get all the quizzes that currently exist
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

// Displays all scores for the selected quiz
// If there are no scores, then it says so
const showAllScores = async () => {
  const data = await fetch(
    `/score${currentQuiz ? `?quiz=${currentQuiz}` : ''}`,
    {
      method: 'get',
      headers: { Accept: 'application/json' },
    },
  );

  const json = await data.json();

  allScoresList.innerHTML = '';
  const values = Object.values(json);

  if (values.length === 0) {
    noScoresText.style.display = 'flex';
    return;
  }

  noScoresText.style.display = 'none';

  const sorted = values.sort((valueA, valueB) => valueB.score - valueA.score);
  sorted.forEach((value) => {
    allScoresList.innerHTML += `
  <li>
    <div>
      <p>${value.name}</p><p> ${value.score}</p>
    </div
  </li>
  `;
  });
};

quizSelect.onchange = async () => {
  currentQuiz = quizSelect.value;
  await showAllScores();
};

showAllScores();
