let numberCorrect = 0;
let numQuestions = 0;
const MAX_QUESTIONS = 10; // Capping at 10 questions for now

// Grab url params
const params = document.location.search.split('&');
const currentName = params[0].split('=')[1];
const currentQuiz = params.length > 1 ? params[1].split('=')[1] : undefined;

// Grab a random image based on the question
const getRandomImages = async (order) => {
  const numImagesPerAnimal = 3;
  const images = {};

  // Make sure the same image is never used within the same question
  for (let i = 0; i < order.length; i++) {
    const index = Math.floor(Math.random() * numImagesPerAnimal) + 1;
    const key = order.charAt(i) + index;
    if (!images[key]) {
      images[key] = key;
    } else {
      i--;
    }
  }

  // Image filenames are indexed so they can be easily randomized
  Object.keys(images).forEach((key) => {
    let path = '';
    switch (key.charAt(0)) {
      case 'l':
        path = 'images/leopard/leopard_';
        break;
      case 'c':
        path = 'images/cheetah/cheetah_';
        break;
      case 'j':
        path = 'images/jaguar/jaguar_';
        break;
      default:
    }

    path += `${key.charAt(1)}.jpg`;
    images[key] = path;
  });

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
  Object.values(images).forEach((path, i) => {
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
    imageContainer.appendChild(image);
  });

  feedback.innerText = `${numberCorrect}/${MAX_QUESTIONS}`;
};

getRandomQuestion();
