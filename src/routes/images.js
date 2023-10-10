import * as fs from 'fs';

const getImage = (request, response) => {
  const file = fs.readFileSync(`client/${request.url}`);

  const ext = request.url.split('.')[1];

  if (ext === 'gif') {
    response.writeHead(200, { 'Content-Type': 'image/gif' });
  } else {
    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  }
  response.write(file);
  response.end();
};

export default getImage;
