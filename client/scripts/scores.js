const allScoresList = document.getElementById('lsAllScores');
const quizSelect = document.getElementById('quizSelect');
const currentQuiz = undefined;

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
    allScoresList.innerHTML = 'No scores right now!';
    return;
  }

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

showAllScores();