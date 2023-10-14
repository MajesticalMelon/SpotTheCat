import * as fs from 'fs';

const index = fs.readFileSync('client/index.html');
const create = fs.readFileSync('client/create.html');
const about = fs.readFileSync('client/about.html');
const scores = fs.readFileSync('client/scores.html');
const rules = fs.readFileSync('client/rules.html');
const quiz = fs.readFileSync('client/quiz.html');
const results = fs.readFileSync('client/results.html');

export const getIndexHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

export const getCreateHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(create);
  response.end();
};

export const getAboutHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(about);
  response.end();
};

export const getScoresHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(scores);
  response.end();
};

export const getRulesHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(rules);
  response.end();
};

export const getQuizHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(quiz);
  response.end();
};

export const getResultsHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(results);
  response.end();
};

export const getNotFound = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'application/json',
  });
  response.write(
    JSON.stringify({
      id: 'notFound',
      message: 'The page you are looking for was not found',
    }),
  );
  response.end();
};
