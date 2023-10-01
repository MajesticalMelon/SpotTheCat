import { createServer } from 'http';
import getCSS from './routes/styles.js';
import getScript from './routes/scripts.js';
import * as pageHandler from './routes/pages.js';
import getQuestion from './routes/questions.js';
import getImage from './routes/images.js';

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
    case '/rules':
      pageHandler.getRulesHTML(request, response);
      break;
    case '/quiz':
      pageHandler.getQuizHTML(request, response);
      break;
    case '/question':
      getQuestion(request, response);
      break;
    case '/favicon.ico':
      break;
    default:
      pageHandler.getNotFound(request, response);
      break;
  }
};

createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
