import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/const/Dom.js';

let DOM_SELECT_ID = (id) => document.getElementById(id);
const DOM_SELECT_CLASS = (select) => document.querySelector(select);

let tasks = [];

// класс для переключения видимости модального окна
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
  // обращаемся к кнопке "Create Task" и делаем поп ап видимым
  DOM_SELECT_ID(DOM.button.CREATE_TASK),
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
);
let closeTask = new Clicker(
  // обращаемся к иконке крестика, чтобы закрыть поп ап
  DOM_SELECT_CLASS(DOM.button.CLOSE_TASK),
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
);

// вставляем из local storage таски в страницу
function insertTasksFromLocal() {
  // достаем и парсим массив объектов из local storage
  for (let j = 0; j < localStorage.length; j++) {
    const currentKey = localStorage.key(j);
    if (Number(currentKey)) {
      const rawTasks = localStorage.getItem(currentKey);
      const testTasks = JSON.parse(rawTasks);
      // обращаемся к экземпляру одного таск листа
      const createTaskWithClickOnButton = DOM_SELECT_ID('TemplateTask');
      // обращаемся к родителю, в который будем вставлять таски
      const insertTask = DOM_SELECT_ID('TasksParentForInsert');
      // итерируемся по объектам из Local Storage
      testTasks.forEach((oneTask) => {
        // клонируем таск и обращаемся к его значениям
        const taskView = createTaskWithClickOnButton.cloneNode(true);
        let titleInject = taskView.querySelector(`[data-id="setTitle"]`);
        let dataInject = taskView.querySelector(`[data-id="setDate"]`);
        let tagsInject = taskView.querySelector(`[data-id="setTags"]`);
        // вставляем в карточку данные из Local Storage
        titleInject.innerText = oneTask.title;
        dataInject.innerText = oneTask.date;
        tagsInject.innerHTML = oneTask.tags;
        // вставляем карточку с готовыми данными в родителя
        insertTask.prepend(taskView);
        // вешаем сразу слушатель событий на нажатие карточки
        taskView.onclick = () => {
          // создаем слон поп апа
          let cloneModal = DOM_SELECT_CLASS(DOM.button.IS_VISIBLE).cloneNode(true);
          let BODY = DOM_SELECT_CLASS('body');
          // обращаемся к полям поп апа
          const inpTitle = cloneModal.querySelector(`[data-id="text"]`);
          const inpDate = cloneModal.querySelector(`[data-id="date"]`);
          const inpTags = cloneModal.querySelector(`[data-id="selected-tags"]`);
          // вставляем в поля поп апа данные из карточки таска
          inpTitle.value = oneTask.title;
          inpDate.value = oneTask.date;
          inpTags.innerHTML = oneTask.tags;
          // делаем поп ап видимым, вставляем в дом дерево
          cloneModal.classList.toggle('hidden');
          BODY.prepend(cloneModal);
          // изменяем в поп апе "Create Task" на "Update Task"
          cloneModal.querySelector(`[data-id="text-switch-modal"]`).innerText = 'Update Task';
          // скрываем поп ап
          let closeTask = new Clicker(
            DOM_SELECT_CLASS(DOM.button.CLOSE_TASK),
            DOM_SELECT_CLASS(DOM.button.IS_VISIBLE),
          );
          let titleInjectUpdate = taskView.querySelector(`[data-id="setTitle"]`);
          let dataInjectUpdate = taskView.querySelector(`[data-id="setDate"]`);
          let tagsInjectUpdate = taskView.querySelector(`[data-id="setTags"]`);
          // далее попытка загружать данные обратно в карточку (не сделано)
          function updateTask() {
            const selected = DOM_SELECT_ID('countries');
            // массив "мусорка" в который складываются все теги при нажатии
            let tagListUpdate = [];
            // массив, в котором хранятся уникальные значения тегов
            let setTagListUpdate = [];
            let currentTagListUpdate = document.querySelector(`[data-id="selected-tags"]`);
            // слушаем селект с тегами
            selected.onchange = (e) => {
              // помещаем в виде html структуры новое значение селекта
              tagListUpdate.push(
                '<span class="p1 bg-neutral-100 rounded-1xl">' + e.target.value + '</span>',
              );
              // достаем из массива уникальные значение
              setTagListUpdate = Array.from(new Set(tagListUpdate));
              // вставляем значения в класс под селектом
              currentTagListUpdate.innerHTML = setTagListUpdate.join('');

              // удаление тегов внутри поп апа
              function deleteTagses() {
                // достаем уже выбранные теги
                let listOfSelectedTags = currentTagListUpdate.childNodes;
                let newArrayAfterDelete = [];
                // итерируемся по выбранным тегам
                listOfSelectedTags.forEach((SelectedTag) => {
                  SelectedTag.onclick = () => {
                    // удаляем из html структуры тег при клике на него
                    SelectedTag.remove();
                    // обнуляем массив со всеми нажатиями на теги
                    tagListUpdate = [];
                    // обращаемся к обновленному списку из тегов
                    let newlistOfSelectedTags = currentTagListUpdate.childNodes;
                    // итерируемся по обновленному списку тегов
                    newlistOfSelectedTags.forEach((newSelectedTag) => {
                      tagListUpdate.push(
                        // помещаем в общий массив каждый тег
                        '<span class="p1 bg-neutral-100 rounded-1xl">' +
                          newSelectedTag.innerText +
                          '</span>',
                      );
                    });
                    // получаем уникальные значения в массив снова, для дальнейшей вставки
                  };
                });
              }

              deleteTagses();
              setTagListUpdate = Array.from(new Set(tagListUpdate));
              tagsInjectUpdate.innerHTML = '';
              setTagListUpdate.forEach((Tag) => {
                tagsInjectUpdate.innerHTML += Tag;
              });
            };
            inpTitle.oninput = (e) => {
              oneTask.title = e.target.value;
              titleInjectUpdate = oneTask.title;
              let arrTasks = [];
              console.log(setTagListUpdate);
              let jsonTask = {
                title: oneTask.title,
                date: oneTask.date,
                tags: setTagListUpdate,
              };
              arrTasks.push(jsonTask);
              localStorage.setItem(currentKey, JSON.stringify(arrTasks));
            };
            inpDate.oninput = (e) => {
              oneTask.date = e.target.value;
              dataInjectUpdate = oneTask.date;
              let arrTasks = [];
              let jsonTask = {
                title: oneTask.title,
                date: oneTask.date,
                tags: setTagListUpdate,
              };
              arrTasks.push(jsonTask);
              localStorage.setItem(currentKey, JSON.stringify(arrTasks));
            };
            const btnCreate = document.getElementById('btnCreateTaskConfirm');
            btnCreate.onclick = () => {
              cloneModal.classList.toggle('hidden');
            };
          }
          updateTask();
        };
      });
    }
  }
}
insertTasksFromLocal();

const createTaskWithClickOnButton = DOM_SELECT_ID('TemplateTask');
const insertTask = DOM_SELECT_ID('TasksParentForInsert');

// создаем новый таск
function setValuesFromInput() {
  const inpTitle = DOM_SELECT_ID('inpTitle');
  const inpDate = DOM_SELECT_ID('inpDate');
  const select = DOM_SELECT_ID('countries');
  // обнуляем все поля
  let inpTitleValue = '';
  let inpDateValue = '';
  let countriesValues = [];
  // отслеживаем событие изменения полей
  inpTitle.oninput = (e) => {
    inpTitleValue = e.target.value;
  };
  inpDate.oninput = (e) => {
    inpDateValue = e.target.value;
  };
  // массив "мусорка" в который складываются все теги при нажатии
  let tagList = [];
  // массив, в котором хранятся уникальные значения тегов
  let setTagList = [];
  let currentTagList = document.querySelector(`[data-id="selected-tags"]`);
  // слушаем селект с тегами

  select.onchange = (e) => {
    // помещаем в виде html структуры новое значение селекта
    tagList.push('<span class="p1 bg-neutral-100 rounded-1xl">' + e.target.value + '</span>');
    // достаем из массива уникальные значение
    setTagList = Array.from(new Set(tagList));
    // вставляем значения в класс под селектом
    currentTagList.innerHTML = setTagList.join('');

    // удаление тегов внутри поп апа
    function deleteTags() {
      // достаем уже выбранные теги
      let listOfSelectedTags = currentTagList.childNodes;
      let newArrayAfterDelete = [];
      // итерируемся по выбранным тегам
      listOfSelectedTags.forEach((SelectedTag) => {
        SelectedTag.onclick = () => {
          // удаляем из html структуры тег при клике на него
          SelectedTag.remove();
          // обнуляем массив со всеми нажатиями на теги
          tagList = [];
          // обращаемся к обновленному списку из тегов
          let newlistOfSelectedTags = currentTagList.childNodes;
          // итерируемся по обновленному списку тегов
          newlistOfSelectedTags.forEach((newSelectedTag) => {
            tagList.push(
              // помещаем в общий массив каждый тег
              '<span class="p1 bg-neutral-100 rounded-1xl">' + newSelectedTag.innerText + '</span>',
            );
            console.log(tagList);
          });
          // получаем уникальные значения в массив снова, для дальнейшей вставки
          setTagList = Array.from(new Set(tagList));
        };
      });
    }
    deleteTags();
  };

  // отслеживаем событие нажатия на кнопку "Create"
  DOM_SELECT_ID(DOM.button.CREATE_TASK_CONFIRM).onclick = () => {
    // клонируем карточку
    const taskView = createTaskWithClickOnButton.cloneNode(true);
    let titleInject = taskView.querySelector(`[data-id="setTitle"]`);
    let dataInject = taskView.querySelector(`[data-id="setDate"]`);
    let tagsInject = taskView.querySelector(`[data-id="setTags"]`);

    // обнуляем в клонированной карточке теги
    tagsInject.innerHTML = '';
    // вставляем из массива выше новые теги
    setTagList.forEach((Tag) => {
      tagsInject.innerHTML += Tag;
    });
    // вставляем значения из поп апа в карточку
    titleInject.innerText = inpTitleValue;
    dataInject.innerText = inpDateValue;

    // проверка на непустые поля
    if (inpTitleValue && dataInject) {
      insertTask.prepend(taskView);
    } else {
      alert('заполните хотя бы одно поле');
    }

    // создаем объект из данных, которые вставляем
    let jsonTask = {
      title: inpTitleValue,
      date: inpDateValue,
      tags: setTagList,
    };

    // пушим в массив
    tasks.push(jsonTask);
    console.log(inpTitleValue, inpDateValue, setTagList);
    // пушим массив в local Storage
    localStorage.setItem(Date.now(), JSON.stringify(tasks));

    // обнуляем все поля поп апа и массивы
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

const addTask = document.querySelector(`[data-id="add-task"]`);
addTask.onclick = () => {
  DOM_SELECT_CLASS(DOM.button.IS_VISIBLE).classList.toggle('hidden');
};
