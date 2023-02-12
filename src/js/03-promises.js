import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = { 
  submitForm: document.querySelector(".form"),
  firstDelay: document.querySelector(`[name="delay"]`),
  delayStep: document.querySelector(`[name="step"]`),
  amountForm: document.querySelector(`[name="amount"]`),
  submitBtn: document.querySelector(".button"),
}

refs.submitForm.addEventListener("submit", onFormSubmit) ;

  function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(refs.firstDelay.value);
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amountForm.value);

  for(let i=1; i <= amount; i+=1){
    createPromise(i, delay)
    .then(({position, delay}) =>{
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) =>{
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else{
      reject({position, delay});
    }
    }, delay);
    });
  }





