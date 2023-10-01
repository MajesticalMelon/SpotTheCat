let numberCorrect = 0;
let numQuestions = 0;
const MAX_QUESTIONS = 10;

const getRandomImage = async (order) => {
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
    body: `name=test&score=${numberCorrect}`,
  });
};

const getRandomQuestion = async () => {
  if (numQuestions === MAX_QUESTIONS) {
    await saveScore();
    window.open('/results', '_self');
    return;
  }

  const data = await fetch('/question', { method: 'GET', headers: { Accept: 'application/json' } });
  const json = await data.json();

  const images = await getRandomImage(json.order);

  const prompt = document.getElementById('question');
  const imageContainer = document.getElementById('images');
  const feedback = document.getElementById('feedback');

  prompt.innerText = json.prompt;

  imageContainer.innerHTML = '';
  Object.values(images).forEach((path, i) => {
    const image = document.createElement('img');
    image.src = path;
    image.alt = 'cat image';
    console.log(json.answer.index, i);
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

  feedback.innerText = `${numberCorrect}/${numQuestions}`;
};

document.querySelector('button').onclick = getRandomQuestion;
