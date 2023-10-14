import * as query from 'querystring';

// Parses the body of a post request
export const parseBody = (request, response, handler) => {
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

// Gets query params from a provided URL
// and puts them in a map as (param name, param value) pairs
export const getQueryParams = (url) => {
  let paramsString = url.split('?');
  if (paramsString.length === 1) {
    return undefined;
  }

  paramsString = paramsString[1].split('&');
  const paramsMap = {};
  paramsString.forEach((p) => {
    const [param, value] = p.split('=');
    paramsMap[param] = value;
  });

  return paramsMap;
};
