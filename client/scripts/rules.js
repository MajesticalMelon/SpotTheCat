console.log('quiz!');

const enableContinue = () => {
  const button = document.getElementById('continue');
  button.disabled = false;
  button.onclick = () => {
    window.open('/quiz', '_self');
  };
};

setTimeout(enableContinue, 2000);
