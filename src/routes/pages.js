import * as fs from 'fs';

const index = fs.readFileSync('client/index.html');
const quiz = fs.readFileSync('client/quiz.html');

export const getIndexHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

export const getQuizHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(quiz);
  response.end();
};

export const getNotFound = (request, response) => {
  response.writeHead(404, { 'Content-type': 'application/json' });
  response.write(JSON.stringify({ id: 'notFound', message: 'The page you are looking for was not found' }));
  response.end();
};
