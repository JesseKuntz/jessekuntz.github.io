"use strict";

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title");
    const emoji = this.getAttribute("emoji");
    const name = this.getAttribute("name");

    this.innerHTML = `
      <a class='card' href="${name}.html">
        <div class='title-wrapper'>
          <div class='emoji'>
            <span class="fluent-emoji--${emoji}"></span>
          </div>
          <h3 class='card-title'>
            <div>${title}</div>
          </h3>
        </div>
      </a>
    `;

    // this.className = "no-after";
  }
}

window.customElements.define("project-card", ProjectCard);
