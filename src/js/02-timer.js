import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
////
import FlipDown from 'flipdown-mp';
import '../css/timer.css';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

  const btStart = document.querySelector('[data-start]');



const baza = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      dateValidate(selectedDates[0]);
    },
  });
  btStart.addEventListener('click', startTimer);


  function dateValidate(inputDate) {
    if (new Date() >= inputDate) {
      btStart.disabled = 'true';
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    btStart.removeAttribute('disabled');
    Notiflix.Notify.success('Press start for countdown');
  }

  
  let tim = null;
  const oneSeconds = 1000;

  function startTimer(){
   btStart.disabled = 'true';
    const dateNow = Date.now();
    const userTime = baza.selectedDates[0].getTime() - Date.now();
    new FlipDown(
      Math.floor(
        new Date(baza.selectedDates[0] - oneSeconds).getTime() / 1000
      )
    ).start();
  
    tim = setInterval(() => {
      const deltaTime = Date.now() - dateNow;
      if (userTime < deltaTime) {
        clearInterval(tim);
        return;
      }
      updateClockFace(convert(userTime - deltaTime));
    }, oneSeconds);

  }

  function convert(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));

    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }


  function pad(value) {
    return String(value).padStart(2, '0');
  }


