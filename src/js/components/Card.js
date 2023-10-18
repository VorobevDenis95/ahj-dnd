export default class Container {
  constructor(parentE1) {
    this.parentE1 = parentE1;
  }

  static get marking() {
    return `
      <div class="card-container">
            <p class="text-card">
                <span class="delete-card">x</span>
        </div>
      `;
  }

  bindToDom() {
    this.parentE1.innnerHTML = Container.marking;
  }
}
