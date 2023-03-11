const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bgColor = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', function () {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  bgColorID = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(bgColorID);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
});
