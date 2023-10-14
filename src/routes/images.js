import * as fs from 'fs';

const getImage = (request, response) => {
  const ext = request.url.split('.');

  if (ext.length > 1) {
    const file = fs.readFileSync(`client/${request.url}`);

    if (ext[-1] === 'gif') response.writeHead(200, { 'Content-Type': 'image/gif' });
    if (ext[-1] === 'jpg' || ext[-1] === 'jpeg') response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    response.write(file);
  } else if (ext.length === 1) {
    const file = fs.readdirSync(`client/${request.url}`);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ imageCount: file.length }));
  }
  response.end();
};

export default getImage;
