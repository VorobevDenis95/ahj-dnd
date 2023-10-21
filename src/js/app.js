import Render from './Render';

// base todo card
const render = new Render();
render.actionDefault();

const addNewTask = document.querySelectorAll('.add_card');

function createAddCard() {
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Create todo';
  div.classList.add('new-card');
  const textarea = document.createElement('textarea');
  textarea.textContent = textarea.value;
  textarea.classList.add('textarea');
  const containerButton = document.createElement('div');
  containerButton.classList.add('container_buttons');
  const buttonAdd = document.createElement('button');
  buttonAdd.classList.add('btn_add');
  buttonAdd.textContent = 'add task';
  const buttonClose = document.createElement('button');
  buttonClose.classList.add('btn_close');
  buttonAdd.addEventListener('click', () => {
    if (textarea.value.trim()) {
      const column = document.querySelector(`.${div.parentElement.className.slice(7)}`);
      Render.renderCard(column, textarea.value);
      div.remove();
      column.querySelector('.add_card').classList.remove('vissualy-hidden');
    } else {
      textarea.value = '';
    }
  });
  buttonClose.addEventListener('click', () => {
    const column = document.querySelector(`.${div.parentElement.className.slice(7)}`);
    div.remove();
    column.querySelector('.add_card').classList.remove('vissualy-hidden');
  });
  containerButton.append(buttonAdd);
  containerButton.append(buttonClose);
  buttonClose.textContent = 'x';
  div.append(h2);
  div.append(textarea);
  div.append(containerButton);
  div.append(containerButton);
  return div;
}

// button add card

addNewTask.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    el.parentElement.insertBefore(createAddCard(), el);
    el.classList.add('vissualy-hidden');
  });
});

function createClosedElement() {
  const div = document.createElement('div');
  div.classList.add('closed_card');
  div.textContent = '\u2573';

  return div;
}

function createShadowElement(element) {
  const div = document.createElement('div');
  const { width, height } = element.getBoundingClientRect();

  div.classList.add('shadow_container');

  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  return div;
  // const {width, height} = element.style;
}

const cardInFocus = (e) => {
  const activeCard = e.target.closest('.card');
  if (activeCard) {
    const columnInFokus = activeCard.closest('.column');
    const closed = createClosedElement();

    const { width } = activeCard.getBoundingClientRect();

    closed.style.top = `${activeCard.offsetTop + 2}px`;
    closed.style.left = `${width + activeCard.offsetLeft - 17}px`;

    if (!columnInFokus.querySelector('.closed_card')) {
      closed.addEventListener('click', () => {
        activeCard.remove();
        closed.remove();
      });

      columnInFokus.insertAdjacentElement('afterbegin', closed);
    }
  }

  if (document.querySelector('.closed_card') && !activeCard && e.target !== document.querySelector('.closed_card')) {
    document.querySelector('.closed_card').remove();
  }
};

let actualElement;

const onMouseMove = (e) => {
  actualElement.style.left = `${e.clientX}px`;
  actualElement.style.top = `${e.clientY}px`;

  if (e.target.classList.contains('card') || e.target.classList.contains('title')) {
    const { y, height } = e.target.getBoundingClientRect();

    const shadowElement = createShadowElement(actualElement);
    let shadowContainer;

    if ((y + height / 2) > e.clientY && !e.target.classList.contains('title')) {
      if (document.querySelector('.shadow_container')) {
        document.querySelector('.shadow_container').remove();
      }
      shadowContainer = e.target.previousElementSibling.closest('.card') || e.target.previousElementSibling.closest('.title');
      if (shadowContainer) {
        shadowContainer.insertAdjacentElement('afterend', shadowElement);
      }
    }
    if ((y + height / 2) < e.clientY) {
      if (document.querySelector('.shadow_container')) {
        document.querySelector('.shadow_container').remove();
      }
      shadowContainer = e.target.nextElementSibling.closest('.card') || e.target.nextElementSibling.closest('.add_card');
      if (shadowContainer) {
        shadowContainer.insertAdjacentElement('beforebegin', shadowElement);
      }
    }
  }
};

const onMouseUp = (e) => {
  const mouseUpColumn = e.target.closest('.column');

  if (e.target.classList.contains('shadow_container')) {
    const shadowContainer = mouseUpColumn.querySelector('.shadow_container');
    mouseUpColumn.insertBefore(actualElement, shadowContainer);
  }

  actualElement.style.width = null;
  actualElement.style.height = null;

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  if (document.querySelector('.shadow_container')) {
    document.querySelector('.shadow_container').remove();
  }

  document.querySelector('.app_container').classList.remove('allocation');
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mousemove', onMouseMove);

  document.addEventListener('mousemove', cardInFocus);
};

const columns = document.querySelectorAll('.column');

columns.forEach((column) => {
  column.addEventListener('mousemove', cardInFocus);
  column.addEventListener('mousedown', (e) => {
    // e.preventDefault();
    if (e.target.closest('.card')) {
      document.querySelector('.app_container').classList.add('allocation');
      actualElement = e.target.closest('.card');

      const {
        width, height, top, left,
      } = actualElement.getBoundingClientRect();

      actualElement.classList.add('dragged');
      actualElement.style.top = `${top}px`;
      actualElement.style.left = `${left}px`;

      actualElement.style.width = `${width}px`;
      actualElement.style.height = `${height}px`;

      document.documentElement.removeEventListener('mousemove', cardInFocus);
      document.documentElement.addEventListener('mousemove', onMouseMove);
      document.documentElement.addEventListener('mouseup', onMouseUp);
    }
  });
});
