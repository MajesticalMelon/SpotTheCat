import * as fs from 'fs';

const favicon = fs.readFileSync('client/favicon.ico');

export const getFavicon = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.write(favicon);
  response.end();
};

export const getImage = (request, response) => {
  const ext = request.url.split('.');

  // If there is a file extension, get the file
  if (ext.length > 1) {
    const file = fs.readFileSync(`client/${request.url}`);

    if (ext[-1] === 'gif') response.writeHead(200, { 'Content-Type': 'image/gif' });
    if (ext[-1] === 'jpg' || ext[-1] === 'jpeg') response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    response.write(file);
  } else if (ext.length === 1) {
    // If there is no extension, then get the file count at that directory
    const file = fs.readdirSync(`client/${request.url}`);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ imageCount: file.length }));
  }
  response.end();
};
