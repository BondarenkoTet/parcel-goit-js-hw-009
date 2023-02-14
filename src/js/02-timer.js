import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const timer = document.querySelector('timer');
const startBtn = document.querySelector('.button');

const spanDays = document.querySelector('.value[data-days]');
const spanHours = document.querySelector('.value[data-hours]');
const spanMinutes = document.querySelector('.value[data-minutes]');
const spanSeconds = document.querySelector('.value[data-seconds]');

startBtn.addEventListener('click', startTimer);

let countDownDate = "";

// function startTimer() {
//   startBtn.disabled = true;

//   let timerId = setInterval(() => 
//   let dateDiff = countDownDate - Date.now(),

//   if(dateDiff > 0) {
//     updateTimerUi(convertMs(dateDiff));
//   }, 1000)
//  else  {clearInterval(timerId)}
// }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtn.disabled = true;
      Notify.failure(`Please choose a date in the future`);
      return;
    }
    if (selectedDates[0] > options.defaultDate) {
      startBtn.disabled = false;
      countDownDate = selectedDates[0];
    }
  },
};

const calendar = flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerUi({ days, hours, minutes, seconds }) {
  spanDays.textContent = addLeadingZero(days);
  spanHours.textContent = addLeadingZero(hours);
  spanMinutes.textContent = addLeadingZero(minutes);
  spanSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
