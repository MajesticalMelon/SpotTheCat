let correctAnswers = 0;

const showQuestion = (questionData, imageData) => {
  const prompt = document.getElementById('question');
  const imageContainer = document.getElementById('images');
  const feedback = document.getElementById('feedback');

  prompt.innerText = questionData.prompt;
  feedback.innerText = `Image ${questionData.answer.index} was correct! That's ${correctAnswers} correct so far!`;

  imageContainer.innerHTML = '';
  Object.values(imageData).forEach((path) => {
    imageContainer.innerHTML += `<img src='${path}' alt='cat image' />`;
  });

  correctAnswers++;
};

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

const getRandomQuestion = async () => {
  const data = await fetch('/question', { method: 'GET' });
  const json = await data.json();

  const images = await getRandomImage(json.order);
  showQuestion(json, images);
};

document.querySelector('button').onclick = getRandomQuestion;
