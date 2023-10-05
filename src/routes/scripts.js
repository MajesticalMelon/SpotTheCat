import * as fs from 'fs';

const getScript = (request, response) => {
  const file = fs.readFileSync(`client/${request.url}`);

  response.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  response.write(file);
  response.end();
};

export default getScript;
