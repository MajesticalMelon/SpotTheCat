const nameElement = document.getElementById('name');
const promptElement = document.getElementById('prompt');
const image1Element = document.getElementById('image1');
const image2Element = document.getElementById('image2');
const image3Element = document.getElementById('image3');
const answerElement = document.getElementById('answer');
const addButton = document.getElementById('addButton');
const submitButton = document.getElementById('submitButton');
const numQuestions = document.getElementById('numQuestions');
const btnHome = document.getElementById('btnHome');

let num = 0;

let quizName = '';
let prompt = '';
let image1 = 'l';
let image2 = 'c';
let image3 = 'j';
const answer = [0, 'l'];

btnHome.onclick = () => {
  window.open('/', '_self');
};

nameElement.onchange = () => {
  quizName = nameElement.value;
};

// Allow users to add a question once a prompt has been inputted
promptElement.onchange = () => {
  prompt = promptElement.value;
  addButton.disabled = prompt === '';
};

// Modify answer dropdown based on the selected image types
image1Element.onchange = () => {
  image1 = image1Element.value;
  answerElement.childNodes.forEach((c) => {
    const child = c;
    if (c.value === 'image1') {
      switch (image1) {
        case 'l':
          child.innerText = 'Leopard #1';
          break;
        case 'c':
          child.innerText = 'Cheetah #1';
          break;
        case 'j':
          child.innerText = 'Jaguar #1';
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
          child.innerText = 'Leopard #2';
          break;
        case 'c':
          child.innerText = 'Cheetah #2';
          break;
        case 'j':
          child.innerText = 'Jaguar #2';
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
          child.innerText = 'Leopard #3';
          break;
        case 'c':
          child.innerText = 'Cheetah #3';
          break;
        case 'j':
          child.innerText = 'Jaguar #3';
          break;
        default:
          break;
      }
    }
  });
};

// Parse answer dropdown into the needed format
answerElement.onchange = () => {
  answer[0] = +answerElement.value.charAt(answerElement.value.length - 1) - 1;
  answer[1] = document.getElementById(answerElement.value).value;
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
  submitButton.disabled = false;
  num++;
  numQuestions.innerText = `Q${num + 1}`;
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
