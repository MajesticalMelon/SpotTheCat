import * as fs from 'fs';

const questionsFile = fs.readFileSync('src/json/questions.json', 'utf8');
let defaultQuestions = [];
const userQuestions = {
  owen: [
    {
      prompt: 'Which one is a leopard? Owen',
      order: 'lcj',
      answer: {
        animal: 'l',
        index: '0',
      },
    },
    {
      prompt: 'Which one is a cheetah? Owen',
      order: 'lcj',
      answer: {
        animal: 'c',
        index: '1',
      },
    },
    {
      prompt: 'Which one is a jaguar? Owen',
      order: 'lcj',
      answer: {
        animal: 'j',
        index: '2',
      },
    },
  ],
};
let availableIndices = [];

try {
  defaultQuestions = JSON.parse(questionsFile);
} catch (error) {
  console.log(error);
  defaultQuestions = questionsFile;
}

// Returns a random question from the chosen list of questions
const question = (request, response, body) => {
  // get questions
  if (
    request.method.toLowerCase() === 'get'
    || request.method.toLowerCase() === 'head'
  ) {
    response.writeHead(200, '{ Content-Type: application/json }');
    if (request.method.toLowerCase() === 'get') {
      let query = request.url.split('?');
      if (query.length === 1) {
        if (availableIndices.length === 0) {
          availableIndices = defaultQuestions.map((_, i) => i);
        }

        const index = Math.floor(Math.random() * availableIndices.length);
        response.write(
          JSON.stringify(defaultQuestions[availableIndices[index]]),
        );
        availableIndices.splice(index, 1);
      } else {
        query = query[1].split('=');
        if (query[0] === 'quiz') {
          if (userQuestions[query[1]]) {
            const questions = userQuestions[[query[1]]];
            if (availableIndices.length === 0) {
              availableIndices = defaultQuestions.map((_, i) => i);
            }

            const index = Math.floor(Math.random() * availableIndices.length);
            response.write(JSON.stringify(questions[availableIndices[index]]));
            availableIndices.splice(index, 1);
          } else {
            response.writeHead(404, '{ Content-Type: application/json }');
            response.write(
              JSON.stringify({
                message: 'Could not find questions for the provided name',
                id: 'notFound',
              }),
            );
          }
        } else {
          response.writeHead(400, '{ Content-Type: application/json }');
          response.write(
            JSON.stringify({
              message: 'Invalid query parameter provided, expected name',
              id: 'badRequest',
            }),
          );
        }
      }
    }
    response.end();
  }
};

export default question;
