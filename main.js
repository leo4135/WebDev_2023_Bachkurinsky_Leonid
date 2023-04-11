import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/const/Dom.js';

let DOM_SELECT_ID = (id) => document.getElementById(id);
const DOM_SELECT_CLASS = (select) => document.querySelector(select);

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

let tasks = [];

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
    tasks.push(taskView);

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
