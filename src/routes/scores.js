import { getQueryParams } from '../helpers.js';

const scores = {
  default: {
    owen: {
      name: 'owen',
      score: 5,
    },
    Emily: {
      name: 'Emily',
      score: 10,
    },
    AThirdOne: {
      name: 'AThirdOne',
      score: 8,
    },
  },
};

const score = (request, response, body) => {
  if (
    request.method.toLowerCase() === 'get'
    || request.method.toLowerCase() === 'head'
  ) {
    if (request.method.toLowerCase() === 'get') {
      const params = getQueryParams(request.url);
      // Grab scores for the default quiz if no params are provided
      if (params === undefined) {
        response.writeHead(200, '{ Content-Type: application/json }');
        response.write(JSON.stringify(scores.default || {}));
      } else if (params.quiz) {
        // Make sure quiz and name params exist
        if (params.name) {
          if (scores[params.quiz]) {
            // Make sure a score exists for the name under that quiz
            if (scores[params.quiz][params.name]) {
              response.writeHead(200, '{ Content-Type: application/json }');
              response.write(JSON.stringify(scores[params.quiz][params.name]));
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
                message: 'Invalid query parameter provided',
                id: 'badRequest',
              }),
            );
          }
          // If no name is provided, grab all scores
        } else if (scores[params.quiz]) {
          response.writeHead(200, '{ Content-Type: application/json }');
          response.write(JSON.stringify(scores[params.quiz]));
        } else {
          response.writeHead(404, '{ Content-Type: application/json }');
          response.write(
            JSON.stringify({
              message: 'Could not find scores for the provided quiz',
              id: 'notFound',
            }),
          );
        }
      }
    }
  } else if (request.method.toLowerCase() === 'post') {
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

    let quiz = 'default';
    if (body.quiz) {
      quiz = body.quiz;
    }

    let responseCode = 204;

    // Parse spaces into a url friendly format
    const quizName = quiz.split(' ').join('%20');
    if (!scores[quizName]) {
      responseCode = 201;
      scores[quizName] = {};
    }

    const name = body.name.split(' ').join('%20');
    if (!scores[quizName][name]) {
      responseCode = 201;
      scores[quizName][name] = {};
    }

    scores[quizName][name].name = body.name;
    scores[quizName][name].score = body.score;

    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
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
