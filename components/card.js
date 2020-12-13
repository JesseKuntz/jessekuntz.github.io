'use strict';

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute('title');
    const emoji = this.getAttribute('emoji');
    const name = this.getAttribute('name');
    const content = this.innerHTML;

    this.innerHTML = `
      <button class='card' id=${name}>
        <div class='title-wrapper'>
          <h3 class='card-title'>
            <span>${title}</span>
            <span>${emoji}</span>
          </h3>
        </div>
        <div class='content'>
          ${content}
        </div>
      </button>
    `;

    this.className = 'card-wrapper';
  }
}

window.customElements.define('project-card', ProjectCard);
