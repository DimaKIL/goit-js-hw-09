import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
////


  const btStart = document.querySelector('[data-start]');
  const btStop = document.querySelector('[data-stop]');
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[darta-minutes]');
  const seconds = document.querySelector('[data-seconds]');


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
  btStop.addEventListener('click', stopTimer);


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
    const userTime = calendar.selectedDates[0].getTime() - Date.now();
    new FlipDown(
      Math.floor(
        new Date(calendar.selectedDates[0] - oneSeconds).getTime() / 1000
      )
    ).start();
  
    tim = setInterval(() => {
      const deltaTime = Date.now() - dateNow;
      if (userTime < deltaTime) {
        clearInterval(tim);
        return;
      }
      updateClockFace(convertMs(userTime - deltaTime));
    }, oneSeconds);

  }

  function stopTimer(){
    location.reload();
  }

  function convertMs(ms) {
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


  function updateClockFace({ days, hours, minutes, seconds }) {
    days.textContent = days;
    hours.textContent = hours;
    minutes.textContent = minutes;
    seconds.textContent = seconds;
  }


