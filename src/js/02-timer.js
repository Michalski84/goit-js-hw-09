import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('input');
const myDate = document.getElementById('datetime-picker');
flatpickr(myDate, options);

console.log(dateInput);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};