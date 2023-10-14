let numberCorrect = 0;
let numQuestions = 0;
const MAX_QUESTIONS = 10; // Capping at 10 questions for now
let numCheetahs;
let numJaguars;
let numLeopards;

let availableCheetahs = [];
let availableJaguars = [];
let availableLeopards = [];

fetch('/images/cheetah', {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((data) => data.json().then((json) => {
  numCheetahs = json.imageCount;
  availableCheetahs = [...Array(numCheetahs).keys()];
}));

fetch('/images/jaguar', {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((data) => data.json().then((json) => {
  numJaguars = json.imageCount;
  availableJaguars = [...Array(numJaguars).keys()];
}));

fetch('/images/leopard', {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then((data) => data.json().then((json) => {
  numLeopards = json.imageCount;
  availableLeopards = [...Array(numLeopards).keys()];
}));

// Grab url params
const params = document.location.search.split('&');
const currentName = params[0].split('=')[1];
const currentQuiz = params.length > 1 ? params[1].split('=')[1] : undefined;

// Grab a random image based on the question
const getRandomImages = async (order) => {
  if (availableCheetahs.length === 0) {
    availableCheetahs = [...Array(numCheetahs).keys()];
  }

  if (availableJaguars.length === 0) {
    availableJaguars = [...Array(numJaguars).keys()];
  }

  if (availableLeopards.length === 0) {
    availableLeopards = [...Array(numLeopards).keys()];
  }

  const images = [];

  // Image filenames are indexed so they can be easily randomized
  for (let i = 0; i < order.length; i++) {
    const c = order.charAt(i);
    let path = '';
    switch (c) {
      case 'l':
        path = `images/leopard/leopard_${
          availableLeopards.splice(
            Math.floor(Math.random() * availableLeopards.length),
            1,
          )[0] + 1
        }.jpg`;
        break;
      case 'c':
        path = `images/cheetah/cheetah_${
          availableCheetahs.splice(
            Math.floor(Math.random() * availableCheetahs.length),
            1,
          )[0] + 1
        }.jpg`;
        break;
      case 'j':
        path = `images/jaguar/jaguar_${
          availableJaguars.splice(
            Math.floor(Math.random() * availableJaguars.length),
            1,
          )[0] + 1
        }.jpg`;
        break;
      default:
    }

    images.push(path);
  }

  return images;
};

const saveScore = async () => {
  await fetch('/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `quiz=${
      currentQuiz || 'default'
    }&name=${currentName}&score=${numberCorrect}`,
  });
};

// Query the CatFact API
const getRandomFact = async () => {
  const data = await fetch('https://catfact.ninja/fact?max_length=100', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return data.json();
};

// Gets a random question and displays that data to the user
// will also save the user's score and open the results page once out of questions
const getRandomQuestion = async () => {
  if (numQuestions === MAX_QUESTIONS) {
    await saveScore();
    window.open(
      `/results?name=${currentName}${
        currentQuiz ? `&quiz=${currentQuiz}` : ''
      }`,
      '_self',
    );
    return;
  }

  const data = await fetch(
    `/question${currentQuiz ? `?quiz=${currentQuiz}` : ''}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    },
  );
  const json = await data.json();

  const images = await getRandomImages(json.order);
  const fact = await getRandomFact();

  const prompt = document.getElementById('question');
  const imageContainer = document.getElementById('images');
  const factContainer = document.getElementById('facts');
  const feedback = document.getElementById('feedback');

  factContainer.innerText = fact.fact;

  prompt.innerText = `${numQuestions + 1}. ${json.prompt}`;

  imageContainer.innerHTML = '';
  images.forEach((path, i) => {
    const div = document.createElement('div');
    div.id = 'imgDiv';
    const image = document.createElement('img');
    image.src = path;
    image.alt = 'cat image';
    if (+i === +json.answer.index) {
      image.onclick = async () => {
        numQuestions++;
        numberCorrect++;
        await getRandomQuestion();
      };
    } else {
      image.onclick = async () => {
        numQuestions++;
        await getRandomQuestion();
      };
    }
    div.appendChild(image);
    imageContainer.appendChild(div);
  });

  feedback.innerText = `${numberCorrect}/${MAX_QUESTIONS}`;
};

getRandomQuestion();
