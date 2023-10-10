const nameHeader = document.getElementById('name');
const score = document.getElementById('score');
const title = document.getElementById('title');
const allScoresButton = document.getElementById('btnAllScores');
const allScoresList = document.getElementById('lsAllScores');

// Grab URL params
const params = document.location.search.split('&');
const currentName = params[0].split('=')[1];
const currentQuiz = params.length > 1 ? params[1].split('=')[1] : undefined;
let showAll = true;

const showScoreByName = async (name) => {
  const data = await fetch(
    `/score?quiz=${currentQuiz || 'default'}&name=${name}`,
    {
      method: 'get',
      headers: { Accept: 'application/json' },
    },
  );
  const json = await data.json();

  allScoresList.innerHTML = '';
  if (data.status === 200) {
    nameHeader.innerText = json.name;
    score.innerText = `${json.score}/10`;
  } else {
    nameHeader.innerText = json.message;
  }
  allScoresButton.innerText = 'Show All Scores!';
};

const showAllScores = async () => {
  const data = await fetch(
    `/score${currentQuiz ? `?quiz=${currentQuiz}` : ''}`,
    {
      method: 'get',
      headers: { Accept: 'application/json' },
    },
  );

  const json = await data.json();

  nameHeader.innerText = '';
  score.innerText = '';
  title.innerText = 'Here are all the scores so far!';
  allScoresList.innerHTML = '';
  Object.values(json).forEach((value) => {
    allScoresList.innerHTML += `
    <li style="display: flex; justify-content: space-between; align-items: center;">
      <h2>${value.name}: </h2><p> ${value.score}</p>
    </li>
    `;
  });
  allScoresButton.innerText = 'Show My Score!';
};

allScoresButton.onclick = async () => {
  if (showAll) {
    showAll = false;
    await showAllScores();
  } else {
    showAll = true;
    await showScoreByName(currentName);
  }
};

window.onload = async () => {
  await showScoreByName(currentName);
};
