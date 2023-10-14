const nameHeader = document.getElementById('name');
const score = document.getElementById('score');
const title = document.getElementById('title');
const allScoresButton = document.getElementById('btnAllScores');
const allScoresList = document.getElementById('lsAllScores');
const btnHome = document.getElementById('btnHome');
const leaderboardText = document.getElementById('leaderboard');

// Grab URL params
const params = document.location.search.split('&');
const currentName = params[0].split('=')[1];
const currentQuiz = params.length > 1 ? params[1].split('=')[1] : undefined;

btnHome.onclick = () => {
  window.open('/', '_self');
};

// Gets the current user's score
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

// Grabs all scores, orders them from highest to lowest, and displays them
const showAllScores = async () => {
  const data = await fetch(
    `/score${currentQuiz ? `?quiz=${currentQuiz}` : ''}`,
    {
      method: 'get',
      headers: { Accept: 'application/json' },
    },
  );

  const json = await data.json();

  if (json.message) {
    allScoresList.innerHTML = `<p>${json.message}</p>`;
    return;
  }

  title.innerText = 'Here are all the scores so far!';
  allScoresList.innerHTML = '';
  const values = Object.values(json);
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
  allScoresButton.innerText = 'Show My Score!';
};

allScoresButton.onclick = async () => {
  await showAllScores();
  allScoresButton.style.display = 'none';
  leaderboardText.style.display = 'block';
};

// Show user's score by default
window.onload = async () => {
  await showScoreByName(currentName);
};
