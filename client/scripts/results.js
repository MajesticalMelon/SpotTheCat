const body = document.querySelector('body');
const currentName = document.location.search.split('=')[1];

fetch(`/score?name=${currentName}`, {
  method: 'get',
  headers: { accept: 'application/json' },
}).then((data) => {
  data.json().then((json) => {
    body.innerText = JSON.stringify(json);
  });
});
