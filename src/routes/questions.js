import * as fs from 'fs';
import { getQueryParams } from '../helpers.js';

const questionsFile = fs.readFileSync('src/json/questions.json', 'utf8');
let defaultQuestions = [];
const userQuestions = {};
let availableIndices = [];

// Attempt to get the questions from questions.json
try {
  defaultQuestions = JSON.parse(questionsFile);
} catch (error) {
  console.log(error);
  defaultQuestions = questionsFile;
}

export const getQuizNames = (request, response) => {
  response.writeHead(200, '{ Content-Type: application/json }');
  if (request.method.toLowerCase() === 'get') {
    const quizzes = [''];
    quizzes.push(...Object.keys(userQuestions));
    response.write(JSON.stringify(quizzes));
  }
  response.end();
};

// Returns a random question from the chosen list of questions
export const question = (request, response, body) => {
  // get questions
  if (
    request.method.toLowerCase() === 'get'
    || request.method.toLowerCase() === 'head'
  ) {
    response.writeHead(200, '{ Content-Type: application/json }');
    if (request.method.toLowerCase() === 'get') {
      const params = getQueryParams(request.url);

      // If no params are provided, then get from the default questions
      if (params === undefined) {
        if (availableIndices.length === 0) {
          availableIndices = defaultQuestions.map((_, i) => i);
        }

        const index = Math.floor(Math.random() * availableIndices.length);
        response.write(
          JSON.stringify(defaultQuestions[availableIndices[index]]),
        );
        availableIndices.splice(index, 1);
      } else if (params.quiz) {
        // If a quiz name is provided and it exists, then get questions from that quiz
        if (userQuestions[params.quiz]) {
          const questions = userQuestions[params.quiz];
          if (availableIndices.length === 0) {
            availableIndices = questions.map((_, i) => i);
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
  } else if (request.method.toLowerCase() === 'post') {
    const responseJSON = {
      message: 'Quiz name is required.',
    };

    if (!body.quiz) {
      responseJSON.id = 'missingParams';
      response.writeHead(400, {
        'Content-Type': 'application/json',
      });
      response.write(JSON.stringify(responseJSON));
      response.end();
      return;
    }

    let responseCode = 204;

    // Parse spaces into a url friendly format
    const quizName = body.quiz.split(' ').join('%20');
    if (!userQuestions[quizName]) {
      responseCode = 201;
      userQuestions[quizName] = [];
    }

    userQuestions[quizName] = JSON.parse(body.questions);

    if (responseCode === 201) {
      responseJSON.messsage = 'Created Successfully';
      response.writeHead(responseCode, {
        'Content-Type': 'application/json',
      });
      response.write(JSON.stringify(responseJSON));
      response.end();
      return;
    }

    response.writeHead(responseCode, {
      'Content-Type': 'application/json',
    });
  }

  response.end();
};
