import * as fs from 'fs';

const getCSS = (request, response) => {
  const file = fs.readFileSync(`client/${request.url}`);

  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(file);
  response.end();
};

export default getCSS;
