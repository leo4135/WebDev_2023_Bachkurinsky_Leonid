import 'uno.css';
import '@unocss/reset/tailwind.css';

const domBtnCreateTask = document.getElementById('btnCreateTask');

domBtnCreateTask.onclick = (e) => {
  let modalWindowVisible = document.querySelector('.modalWindowVisible');
  modalWindowVisible.classList.toggle('hidden');
};

const domBtnClose = document.querySelector('.domBtnClose');
let modalWindowVisible = document.querySelector('.modalWindowVisible');
domBtnClose.onclick = () => {
  modalWindowVisible.classList.toggle('hidden');
};
