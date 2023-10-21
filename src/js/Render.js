export default class Render {
  constructor() {
    this.columnTodo = document.querySelector('.todo');
    this.columnInProgress = document.querySelector('.in_progress');
    this.columnDone = document.querySelector('.done');
  }

  static renderCard(column, text) {
    const containerCard = document.createElement('div');
    const textCard = document.createElement('p');

    containerCard.classList.add('card');
    textCard.classList.add('card_text');

    textCard.textContent = text;

    column.querySelector('.add_card').parentNode.insertBefore(containerCard, column.querySelector('.add_card'));
    containerCard.prepend(textCard);
  }

  defaultContent(column) {
    if (column === this.columnTodo) {
      return [
        'Welcome to Trello!',
        'This is a card',
        "Click on a card what's behind it",
      ];
    }
    if (column === this.columnInProgress) {
      return [
        'Invite your time to this board using the Add Members button',
        "Drag people onto a card to indicate that they're responsible for it",
      ];
    }
    if (column === this.columnDone) {
      return [
        'To learn more tricks, check out the guide',
        "Use as many boards as you want. We'll make more!",
      ];
    }
    return null;
  }

  actionDefault() {
    this.defaultContent(this.columnTodo).forEach((el) => {
      Render.renderCard(this.columnTodo, el);
    });
    this.defaultContent(this.columnInProgress).forEach((el) => {
      Render.renderCard(this.columnInProgress, el);
    });
    this.defaultContent(this.columnDone).forEach((el) => {
      Render.renderCard(this.columnDone, el);
    });
  }
}
