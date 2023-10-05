import { getParams } from '../helpers.js';

const scores = {};

const score = (request, response, body) => {
  if (
    request.method.toLowerCase() === 'get'
    || request.method.toLowerCase() === 'head'
  ) {
    if (request.method.toLowerCase() === 'get') {
      let query = request.url.split('?');
      if (query.length === 0) {
        response.writeHead(200, '{ Content-Type: application/json }');
        response.write(JSON.stringify(scores));
      } else {
        query = query[1].split('=');
        if (query[0] === 'name') {
          if (scores[query[1]]) {
            response.writeHead(200, '{ Content-Type: application/json }');
            response.write(JSON.stringify(scores[[query[1]]]));
          } else {
            response.writeHead(404, '{ Content-Type: application/json }');
            response.write(
              JSON.stringify({
                message: 'Could not find scores for the provided name',
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
  } else if (request.method.toLowerCase() === 'post') {
    console.log(body);
    const responseJSON = {
      message: 'Name and score are both required.',
    };

    if (!body.name || !body.score) {
      responseJSON.id = 'missingParams';
      response.writeHead(400, {
        'Content-Type': 'application/json',
      });
      response.write(JSON.stringify(responseJSON));
      response.end();
      return;
    }

    let responseCode = 204;

    if (!scores[body.name]) {
      responseCode = 201;
      scores[body.name] = {};
    }

    scores[body.name].name = body.name;
    scores[body.name].score = body.score;

    if (responseCode === 201) {
      responseJSON.messscore = 'Created Successfully';
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

export default score;
