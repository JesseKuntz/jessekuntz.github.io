'use strict';

class Header extends HTMLElement {
  constructor() {
    super();

    let title = this.getAttribute('title');
    const className = this.getAttribute('innerClass');

    this.innerHTML = `
      <a id='${title}' href='#${title}' class='header-wrapper'>
        <h2 class='${className} section-header'>
          ${title}
          <div class='link'>🔗</div>
        </h2>
      </a>
    `;
  }
}

window.customElements.define('section-header', Header);
