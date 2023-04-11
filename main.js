import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/const/Dom.js';

let DOM_SELECT_ID = (id) => document.getElementById(id);
const DOM_SELECT_CLASS = (select) => document.querySelector(select);

const rawTasks2 = localStorage.getItem('tasks');
const testTasks2 = JSON.parse(rawTasks2);
let tasks = testTasks2;

class Clicker {
  constructor(isSelect, isToggle) {
    this.isSelect = isSelect;
    this.isToggle = isToggle;
    this.isSelect.onclick = () => {
      this.isToggle.classList.toggle('hidden');
    };
  }
}

let createTask = new Clicker(
  DOM_SELECT_ID(DOM.button.CREATE_TASK),
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
);
let closeTask = new Clicker(
  DOM_SELECT_CLASS(DOM.button.CLOSE_TASK),
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
);

function insertTasksFromLocal() {
  const rawTasks = localStorage.getItem('tasks');
  const testTasks = JSON.parse(rawTasks);
  const createTaskWithClickOnButton = DOM_SELECT_ID('TemplateTask');
  const insertTask = DOM_SELECT_ID('TasksParentForInsert');

  testTasks.forEach((oneTask) => {
    const taskView = createTaskWithClickOnButton.cloneNode(true);
    let titleInject = taskView.querySelector(`[data-id="setTitle"]`);
    let dataInject = taskView.querySelector(`[data-id="setDate"]`);
    let tagsInject = taskView.querySelector(`[data-id="setTags"]`);
    titleInject.innerText = oneTask.title;
    dataInject.innerText = oneTask.date;
    tagsInject.innerHTML = oneTask.tags;
    insertTask.prepend(taskView);
    taskView.onclick = () => {
      let cloneModal = DOM_SELECT_CLASS(DOM.button.IS_VISIBLE).cloneNode(true);
      let BODY = DOM_SELECT_CLASS('body');
      const inpTitle = cloneModal.querySelector(`[data-id="text"]`);
      const inpDate = cloneModal.querySelector(`[data-id="date"]`);
      const inpTags = cloneModal.querySelector(`[data-id="selected-tags"]`);
      inpTitle.value = oneTask.title;
      inpDate.value = oneTask.date;
      inpTags.innerHTML = oneTask.tags;

      cloneModal.classList.toggle('hidden');
      BODY.prepend(cloneModal);
      let closeTask = new Clicker(
        DOM_SELECT_CLASS(DOM.button.CLOSE_TASK),
        DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
      );
    };
  });
}
insertTasksFromLocal();
const createTaskWithClickOnButton = DOM_SELECT_ID('TemplateTask');
const insertTask = DOM_SELECT_ID('TasksParentForInsert');

function setValuesFromInput() {
  const inpTitle = DOM_SELECT_ID('inpTitle');
  const inpDate = DOM_SELECT_ID('inpDate');
  const select = DOM_SELECT_ID('countries');
  let inpTitleValue = '';
  let inpDateValue = '';
  let countriesValues = [];
  inpTitle.oninput = (e) => {
    inpTitleValue = e.target.value;
  };
  inpDate.oninput = (e) => {
    inpDateValue = e.target.value;
  };
  let tagList = [];

  let setTagList = [];
  let currentTagList = document.querySelector(`[data-id="selected-tags"]`);
  select.onchange = (e) => {
    tagList.push('<span class="p1 bg-neutral-100 rounded-1xl">' + e.target.value + '</span>');
    console.log(tagList);
    setTagList = Array.from(new Set(tagList));
    currentTagList.innerHTML = setTagList.join('');

    function deleteTags() {
      let listOfSelectedTags = currentTagList.childNodes;
      let newArrayAfterDelete = [];
      listOfSelectedTags.forEach((SelectedTag) => {
        SelectedTag.onclick = () => {
          SelectedTag.remove();
          tagList = [];
          let newlistOfSelectedTags = currentTagList.childNodes;
          newlistOfSelectedTags.forEach((newSelectedTag) => {
            tagList.push(
              '<span class="p1 bg-neutral-100 rounded-1xl">' + newSelectedTag.innerText + '</span>',
            );
            console.log(tagList);
          });
          setTagList = Array.from(new Set(tagList));
        };
      });
    }

    deleteTags();
  };

  DOM_SELECT_ID(DOM.button.CREATE_TASK_CONFIRM).onclick = () => {
    const taskView = createTaskWithClickOnButton.cloneNode(true);
    let titleInject = taskView.querySelector(`[data-id="setTitle"]`);
    let dataInject = taskView.querySelector(`[data-id="setDate"]`);
    let tagsInject = taskView.querySelector(`[data-id="setTags"]`);
    tagsInject.innerHTML = '';
    setTagList.forEach((Tag) => {
      tagsInject.innerHTML += Tag;
    });
    titleInject.innerText = inpTitleValue;
    dataInject.innerText = inpDateValue;
    if (inpTitleValue && dataInject) {
      insertTask.prepend(taskView);
    } else {
      alert('заполните хотя бы одно поле');
    }
    let jsonTask = {
      title: inpTitleValue,
      date: inpDateValue,
      tags: setTagList,
    };
    tasks.push(jsonTask);
    console.log('массив' + tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inpTitle.value = '';
    inpDate.value = '';
    currentTagList.innerHTML = '';
    select.value = 'Choose a tag';
    setTagList = [];
    tagList = [];
    inpTitleValue = '';
    inpDateValue = '';
    DOM_SELECT_CLASS(DOM.button.IS_VISIBLE).classList.toggle('hidden');
  };
}
setValuesFromInput();

class newTaskForLocal {
  constructor(title, date, tags) {
    this.title = title;
    this.date = date;
    this.tags = tags;
  }
}

const addTask = document.querySelector(`[data-id="add-task"]`);
addTask.onclick = () => {
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE).classList.toggle('hidden');
};
