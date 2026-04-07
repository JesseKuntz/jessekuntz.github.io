"use strict";

const emojis = require("./emojis");

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title");
    const emoji = this.getAttribute("emoji");
    const name = this.getAttribute("name");

    this.innerHTML = `
      <a class='card' href="${name}.html">
        <div class='title-wrapper'>
          <div class="emoji">${emojis[emoji] || ""}</div>
          <h3 class='card-title'>
            <div>${title}</div>
          </h3>
        </div>
      </a>
    `;
  }
}

window.customElements.define("project-card", ProjectCard);
