import { createServer } from 'http';
import getCSS from './routes/styles.js';
import getScript from './routes/scripts.js';
import * as pageHandler from './routes/pages.js';
import { question, getQuizNames } from './routes/questions.js';
import { getImage, getFavicon } from './routes/images.js';
import { parseBody } from './helpers.js';
import score from './routes/scores.js';

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url.split('/')[1]) {
    case 'scripts':
      getScript(request, response);
      return;
    case 'styles':
      getCSS(request, response);
      return;
    case 'images':
      getImage(request, response);
      return;
    default:
      break;
  }

  switch (request.url.split('?')[0]) {
    case '/':
      pageHandler.getIndexHTML(request, response);
      break;
    case '/create':
      pageHandler.getCreateHTML(request, response);
      break;
    case '/about':
      pageHandler.getAboutHTML(request, response);
      break;
    case '/scores':
      pageHandler.getScoresHTML(request, response);
      break;
    case '/rules':
      pageHandler.getRulesHTML(request, response);
      break;
    case '/quiz':
      pageHandler.getQuizHTML(request, response);
      break;
    case '/results':
      pageHandler.getResultsHTML(request, response);
      break;
    case '/quizzes':
      getQuizNames(request, response);
      break;
    case '/question':
      parseBody(request, response, question);
      break;
    case '/score':
      parseBody(request, response, score);
      break;
    case '/favicon.ico':
      getFavicon(request, response);
      break;
    default:
      pageHandler.getNotFound(request, response);
      break;
  }
};

createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
