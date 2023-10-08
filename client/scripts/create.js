const nameElement = document.getElementById('name');
const promptElement = document.getElementById('prompt');
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const answerElement = document.getElementById('answer');
const addButton = document.getElementById('addButton');
const submitButton = document.getElementById('submitButton');

let quizName = '';
let prompt = '';
let image1 = 'l';
let image2 = 'c';
let image3 = 'j';
const answer = [0, 'l'];

nameElement.onchange = () => {
  quizName = nameElement.value;
};

promptElement.onchange = () => {
  prompt = promptElement.value;
  console.log(prompt);

  addButton.disabled = prompt === '';
};

image1Element.onchange = () => {
  image1 = image1Element.value;
  answerElement.childNodes.forEach((c) => {
    const child = c;
    if (c.value === 'image1') {
      switch (image1) {
        case 'l':
          child.innerText = 'Leopard';
          break;
        case 'c':
          child.innerText = 'Cheetah';
          break;
        case 'j':
          child.innerText = 'Jaguar';
          break;
        default:
          break;
      }
    }
  });
};

image2Element.onchange = () => {
  image2 = image2Element.value;
  answerElement.childNodes.forEach((c) => {
    const child = c;
    if (c.value === 'image2') {
      switch (image2) {
        case 'l':
          child.innerText = 'Leopard';
          break;
        case 'c':
          child.innerText = 'Cheetah';
          break;
        case 'j':
          child.innerText = 'Jaguar';
          break;
        default:
          break;
      }
    }
  });
};

image3Element.onchange = () => {
  image3 = image3Element.value;
  answerElement.childNodes.forEach((c) => {
    const child = c;
    if (c.value === 'image3') {
      switch (image3) {
        case 'l':
          child.innerText = 'Leopard';
          break;
        case 'c':
          child.innerText = 'Cheetah';
          break;
        case 'j':
          child.innerText = 'Jaguar';
          break;
        default:
          break;
      }
    }
  });
};

answerElement.onchange = () => {
  answer[0] = +answerElement.value.charAt(answerElement.value.length - 1) - 1;
  answer[1] = document.getElementById(answerElement.value).value;
  console.log(answer);
};

const allQuestions = [];

addButton.onclick = () => {
  allQuestions.push({
    prompt,
    order: image1 + image2 + image3,
    answer: {
      index: answer[0],
      animal: answer[1],
    },
  });
  promptElement.value = '';
  addButton.disabled = true;
  console.log(allQuestions);
  submitButton.disabled = false;
};

submitButton.onclick = async () => {
  await fetch('/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `quiz=${quizName}&questions=${JSON.stringify(allQuestions)}`,
  });
  window.open('/', '_self');
};
