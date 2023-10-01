import * as fs from 'fs';

const questionsFile = fs.readFileSync('src/json/questions.json', 'utf8');
let questions = [];
let availableIndices = [];

try {
  questions = JSON.parse(questionsFile);
  availableIndices = questions.map((_, i) => i);
} catch (error) {
  console.log(error);
  questions = questionsFile;
}

// Returns a random question fromt the list
const getQuestion = (request, response) => {
  if (availableIndices.length === 0) {
    availableIndices = questions.map((_, i) => i);
  }
  const index = Math.floor(Math.random() * availableIndices.length);

  response.writeHead(200, '{ Content-type: application/json }');
  response.write(JSON.stringify(questions[availableIndices[index]]));
  response.end();

  availableIndices.splice(index, 1);
};

export default getQuestion;
