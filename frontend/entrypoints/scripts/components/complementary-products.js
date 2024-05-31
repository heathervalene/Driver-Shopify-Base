/* Driver code for the complementary-products component, used in complementary-products.liquid on the PDP */
class ComplementaryProducts extends HTMLElement {
  constructor() {
    super();
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      rootMargin: '0px 0px 200px 0px'
    });
  }

  connectedCallback() {
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  handleIntersection(entries) {
    if (!entries[0].isIntersecting) return;
    this.observer.unobserve(this);

    const url = this.dataset.url;

    fetch(url)
      .then(response => response.text())
      .then(text => {
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('.product-recommendations');

        if (recommendations && recommendations.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
}

if (!window.customElements.get('complementary-products')) {
  window.customElements.define('complementary-products', ComplementaryProducts);
}
