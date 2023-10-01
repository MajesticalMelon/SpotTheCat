import * as fs from 'fs';

const getImage = (request, response) => {
  const file = fs.readFileSync(`client${request.url}`);
  console.log('ye');

  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(file);
  response.end();
};

export default getImage;
