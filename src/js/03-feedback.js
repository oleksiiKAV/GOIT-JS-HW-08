import throttle from 'lodash.throttle';
import storage from './storage.js';

const LOCAL_KEY = 'feedback-form-state';

form = document.getElementsByClassName('feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = storage.load(LOCAL_KEY)

const { email, message } = form.elements;
reloadPage();

function onInputData() {
    dataForm = { email: email.value, message: message.value };
    storage.save(LOCAL_KEY, dataForm)

}

function reloadPage() {
    if (dataForm) {
        email.value = dataForm.email || '';
        message.value = dataForm.message || '';
    }
}

function onFormSubmit(event) {
    // event.preventDefault();
    console.log({ email: email.value, message: message.value });

    if (email.value === '' || message.value === '') {
        return alert('Please fill in all the fields!');
    }

    localStorage.removeItem(LOCAL_KEY);

    event.currentTarget.reset();
    dataForm = {};
}
