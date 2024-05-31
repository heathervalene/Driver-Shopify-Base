class RevealArticles extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Add event listener to button
    const showMoreBtn = this.querySelector('#showMoreBtn');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        const hiddenBlocks = this.querySelectorAll('.hidden-block');
        hiddenBlocks.forEach(block => {
          block.classList.remove('hidden-block');
        });
        showMoreBtn.style.display = 'none'; // Hide button after use
      });
    }
  }

}

customElements.define('reveal-articles', RevealArticles);