import * as fs from 'fs';

const getImage = (request, response) => {
  const file = fs.readFileSync(`client/${request.url}`);

  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(file);
  response.end();
};

export default getImage;
