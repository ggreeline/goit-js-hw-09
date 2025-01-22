const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const saveToLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(localStorageKey);
  return savedData ? JSON.parse(savedData) : null;
};

const populateForm = () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    formData = savedData;
    form.email.value = savedData.email || '';
    form.message.value = savedData.message || '';
  }
};

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData = { email: '', message: '' };
  form.reset();
});

populateForm();
