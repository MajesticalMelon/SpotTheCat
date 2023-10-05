import * as query from 'querystring';
import * as fs from 'fs';

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

export const loadFile = (request, response, filePath, mimeType) => {
  const file = filePath;

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      response.end();
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = end - start + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
    });

    const stream = fs.createReadStream(file, {
      start,
      end,
    });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};
export const getParams = (url) => new Proxy(new URLSearchParams(url), {
  get: (searchParams, prop) => searchParams.get(prop),
});
