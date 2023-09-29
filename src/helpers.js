import * as query from 'querystring';

const parseBody = (request, response, handler) => {
  const body = [];

  // Check for errors
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // Get the chunks of data that come in
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // Once the request has finished, make something human-readable
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    // Callback
    handler(request, response, bodyParams);
  });
};

export default parseBody;
