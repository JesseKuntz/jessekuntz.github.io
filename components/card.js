"use strict";

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title");
    const emoji = this.getAttribute("emoji");
    const name = this.getAttribute("name");
    const content = this.innerHTML;

    this.innerHTML = `
      <button class='card' id=${name}>
        <div class='title-wrapper'>
          <div class='emoji'>
            <span class="iconify" data-icon="fluent-emoji:${emoji}"></span>
          </div>
          <h3 class='card-title'>
            <div>${title}</div>
          </h3>
        </div>
        <span class='close-button'>
          <i class="gg-close"></i>
          <div class='close-button-overlay'></div>
        </span>
        <div class='content'>
          ${content}
        </div>
      </button>
      <div class='overlay'></div>
    `;

    this.className = "no-after";
  }
}

window.customElements.define("project-card", ProjectCard);
