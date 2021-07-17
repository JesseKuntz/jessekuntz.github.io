'use strict';

class Header extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute('title');

    this.innerHTML = `
      <a id='${title}' href='#${title}' class='header-wrapper'>
        <h2 class='section-header'>
          ${title}
          <div class='link'>🔗</div>
        </h2>
      </a>
    `;
  }
}

window.customElements.define('section-header', Header);
