export default class Container {
  constructor(parentE1, name) {
    this.parentE1 = parentE1;
    this.name = name;
    this.cards = [];

    this.onClick = this.onClick.bind(this);
    this.onClickNewCard = this.onClickNewCard.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
    this.onCardDelete = this.onCardDelete.bind(this);
  }

  static get marking() {
    return `
        <h1 class="title__column-container"></h1>
        <div class="card__container"></div>
        
        <button class="btn_add__card">+ Add another card</button>
        <form class="new-card vissualy-hidden">
          <textarea class="input__new-card"></textarea>
            <button type="submit" class="add__new-card">Add</button>
            <button type="button" class="cancel__new-card">X</button>
        </form>
    `;
  }

  nameContainer() {
    const title = this.parentE1.querySelector('.title__column-container');
    title.textContent = this.name;
  }

  bindToDom() {
    this.parentE1.innerHTML = Container.marking;
    this.nameContainer();

    const btn = this.parentE1.querySelector('.btn_add__card');
    btn.addEventListener('click', this.onClick);

    const btnNewCard = this.parentE1.querySelector('.add__new-card');
    btnNewCard.addEventListener('click', this.onClickNewCard);
    // close popup

    const card = this.parentE1.querySelector('.cancel__new-card');
    card.addEventListener('click', this.onClosePopup);

    this.parentE1.addEventListener('click', this.onCardDelete);
  }

  createCard(value) {
    const card = document.createElement('div');
    const cardContainer = this.parentE1.querySelector('.card__container');
    card.classList.add('card');
    card.innerHTML = `
    <p class='card__content'>${value}</p>
    <button class="card-delete">X</div>
    `;
    cardContainer.appendChild(card);
  }

  addNewCard() {
    const input = this.parentE1.querySelector('.input__new-card');
    if (input.value) {
      this.createCard(input.value);
    }
  }

  onCardDelete(e) {
    if (e.target.className === 'card-delete') {
      e.target.parentNode.remove();
    }
  }

  onClosePopup() {
    const popup = this.parentE1.querySelector('.new-card');
    popup.reset();
    popup.classList.add('vissualy-hidden');
  }

  onClickNewCard(e) {
    e.preventDefault();
    this.addNewCard();
    const form = this.parentE1.querySelector('.new-card');
    form.reset();
    form.classList.add('vissualy-hidden');
  }

  onClick() {
    // const column = this.parentE1.querySelector('.column-container');
    // column.insertAdjacentHTML('beforeend', Container.popup);
    const addCard = this.parentE1.querySelector('.new-card');
    addCard.classList.toggle('vissualy-hidden');

    // let elem = document.createElement('div');
    // elem.textContent = 'hjskksjadkasjd';
    // this.parentE1.prepend(elem);
  }
}
