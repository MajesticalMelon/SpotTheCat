import { createServer } from 'http';

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request);
  console.log(response);
};

createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});