const nameHeader = document.getElementById('name');
const score = document.getElementById('score');
const title = document.getElementById('title');
const allScoresButton = document.getElementById('btnAllScores');
const allScoresList = document.getElementById('lsAllScores');
const currentName = document.location.search.split('=')[1];
let showAll = true;

const showScoreByName = async (name) => {
  const data = await fetch(`/score?name=${name}`, {
    method: 'get',
    headers: { accept: 'application/json' },
  });
  const json = await data.json();

  if (data.status === 200) {
    nameHeader.innerText = json.name;
    score.innerText = `${json.score}/10`;
  } else {
    nameHeader.innerText = json.message;
  }
  allScoresButton.innerText = 'Show All Scores!';
};

const showAllScores = async () => {
  const data = await fetch('/score', {
    method: 'get',
    headers: { accept: 'application/json' },
  });

  const json = await data.json();

  nameHeader.innerText = '';
  score.innerText = '';
  title.innerText = 'Here are all the scores so far!';
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
