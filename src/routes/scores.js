const scores = {};

const score = (request, response, body) => {
  if (
    request.method.toLowerCase() === 'get'
    || request.method.toLowerCase() === 'head'
  ) {
    if (request.method.toLowerCase() === 'get') {
      let query = request.url.split('?');
      if (query.length === 1) {
        response.writeHead(200, '{ Content-Type: application/json }');
        response.write(JSON.stringify(scores.default));
      } else {
        const params = query[1].split('&');
        query = params[0].split('=');
        if (query[0] === 'quiz') {
          const quiz = query[1];
          if (params.length === 2) {
            query = params[1].split('=');
            if (query[0] === 'name' && scores[quiz]) {
              const name = query[1];
              if (scores[quiz][name]) {
                response.writeHead(200, '{ Content-Type: application/json }');
                response.write(JSON.stringify(scores[quiz][name]));
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
          } else if (scores[quiz]) {
            response.writeHead(200, '{ Content-Type: application/json }');
            response.write(JSON.stringify(scores[quiz]));
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

    let quiz = 'default';
    if (body.quiz) {
      quiz = body.quiz;
    }

    let responseCode = 204;

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
