class LoadMore extends HTMLElement {
  constructor() {
    super();
    this._button = this.querySelector('button');
    this._page = 2;
    this._isLoading = false;
    this._sectionId = this.dataset.sectionId;
    this._productGrid = document.querySelector('#product-list-' + this._sectionId);
    this._productCount = this.querySelector('#product-count')
  }

  connectedCallback() {
    if (this._button) {
      this.bindEvent();
      this._productCount.innerHTML = this._productGrid.childElementCount;
    } else {
      console.log('No load-more button');
    }
  }

  addParamsToUrl(url, params) {
    // Create a URL object
    let urlObj = new URL(url, window.location.origin);
    
    // Get the current search params of the URL
    let searchParams = urlObj.searchParams;
    
    // Iterate over the params object and add each key-value pair to the searchParams
    for(let key in params) {
        searchParams.set(key, params[key]);
    }

    // The updated URL string will be in the href property
    return urlObj.href;
}

  bindEvent() {
      console.log('bind')
      this._productGrid = document.querySelector('#product-list-' + this._sectionId);
      this._productCount.innerHTML = this._productGrid.childElementCount;
      this._button.addEventListener('click', () => {
          this.expandShowMore();
        });
  }
  expandShowMore() {
    if(this._isLoading) return;
    this._isLoading = true;


    const queryString = window.location.search;


    const searchParams = new URLSearchParams(window.location.search);
    const url = this.getAttribute('collection-handle') + '?' + searchParams;

    // grab current filters & params
    let paramsObj = {};


    paramsObj['page'] = this._page;
    const newURL = this.addParamsToUrl(url, paramsObj);
    // console.log(paramsObj);
    // console.log(newURL)

    fetch(newURL)
    .then((response) => response.text())
    .then((responseText) => {
      // console.log(responseText)
      const html = new DOMParser().parseFromString(responseText, 'text/html');
      const collectionCount = html.querySelector('#collection-count').getAttribute('count');
      // console.log(collectionCount)
      // console.log(this._productGrid)
      const products = html.querySelector('#product-list-' + this._sectionId).children;

      Array.from(products).forEach(product => {
          this._productGrid.appendChild(product);
      });

      // DRIVER Sort Collections by Availability
      // Dispatch a new event after the new content is added
      document.dispatchEvent(new CustomEvent('collection:updated'));

      if(this._productGrid.childElementCount >= collectionCount) {
        this._button.classList.add('hidden');
      }

      this._page++;
      this._isLoading = false;
      this._productCount.innerHTML = this._productGrid.childElementCount;
      // re-init Swym Wishlist
      console.log('sywm trigger');
      document.dispatchEvent(new CustomEvent('swym:collections-loaded'));

    })
    .catch((e) => {
      console.error(e);
    });
  }
}

customElements.define('load-more', LoadMore);
