const body = document.querySelector('body');

fetch(
  '/score',
  {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  },
).then((data) => {
  data.json().then((json) => {
    body.innerText = JSON.stringify(json);
  });
});
