import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const dateInput = document.querySelector('input');
// const myDate = document.getElementById('datetime-picker');

const timerStyle = document.querySelectorAll('.timer');
for (let i = 0; i < timerStyle.length; i++) {
  timerStyle[i].style.display = 'flex';
  timerStyle[i].style.flexDirection = 'row';
}

const fieldStyle = document.querySelectorAll('.field');
for (let i = 0; i < fieldStyle.length; i++) {
  fieldStyle[i].style.display = 'flex';
  fieldStyle[i].style.flexDirection = 'column';
  fieldStyle[i].style.marginRight = '15px';
  fieldStyle[i].style.marginTop = '15px';
}

const valueStyle = document.querySelectorAll('.value');
for (let i = 0; i < valueStyle.length; i++) {
  valueStyle[i].style.display = 'flex';
  valueStyle[i].style.justifyContent = 'center';
  valueStyle[i].style.fontSize = '25px';
}

const labelStyle = document.querySelectorAll('.label');
for (let i = 0; i < labelStyle.length; i++) {
  labelStyle[i].style.display = 'flex';
  labelStyle[i].style.fontSize = '10px';
  labelStyle[i].style.textTransform = 'uppercase';
}

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let countdown;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// flatpickr initialization
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      clearInterval(countdown);
    }
  },
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// startButton click event listener
startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value);
  countdown = setInterval(() => {
    const timeLeft = selectedDate - new Date();
    if (timeLeft < 0) {
      clearInterval(countdown);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});
