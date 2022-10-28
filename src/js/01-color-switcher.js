const btStart = document.querySelector('[data-start]');
const btStop = document.querySelector('[data-stop]');

btStop.addEventListener('click', onBtStopClick);
btStart.addEventListener('click', onBtStartClick);

let tim = 0;

function onBtStopClick(){
    clearTimeout(tim);
    onStop();
};

function onBtStartClick(){
    onStart();
    tim = setTimeout(() => {
        onBtStartClick();
         changeColor();
    }, 500);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function changeColor(){
    document.body.style.backgroundColor = getRandomHexColor();
  }

  function ifTrue() {
    if(btStop.disabled === 'true'){
        btStart.disabled = 'true';
        btStop.removeAttribute('disabled');
    }
        btStop.disabled = 'true';
    btStart.removeAttribute('disabled'); 
  }
  function onStart() {
    btStart.disabled = 'true';
    btStop.removeAttribute('disabled');
  }
  function onStop() {
    btStop.disabled = 'true';
    btStart.removeAttribute('disabled');
  }