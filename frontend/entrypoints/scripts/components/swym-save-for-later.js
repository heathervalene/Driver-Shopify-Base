class SaveForLater extends HTMLElement {
  constructor() {
    super();
    this.vid = this.getAttribute('data-variant-id');
    this.pid = this.getAttribute('data-product-id');
    this.url = this.getAttribute('data-product-url');
    this.qty = this.getAttribute('data-product-qty');
    this.fetch_url = this.getAttribute('data-fetch-url');

    this.addEventListener("click", this.sflCallback.bind(this))
  }

  sflCallback(event) {
    let onAddedSuccess = function(response) {
        console.log('added to sfl', response);
    }
    let onSuccess = function(response) {
        const lid = response.listid;
        let products = [{
              du: this.url,
              empi: this.pid,
              epi: this.vid,
              qty: this.qty
          }];
        _swat.SaveForLater.add(lid, products, onAddedSuccess, (error)=>{console.log('error adding to sfl'), error});
        console.log("Successfully Initialized, And we created a Save for Later List", response);
    }
    
    let onError = function(error) {
        // Error is an xhrObject
        console.log("There was an Error, while creating the Save For Later List", error);
    }
    
    // Call the Init function.
    _swat.SaveForLater.init(onSuccess.bind(this), onError);

    // Close Prestige Cart Drawer
    let cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer) {
      cartDrawer.removeAttribute('open');
    }
  }
}

if (!customElements.get('save-for-later')) {
  customElements.define(
    'save-for-later', SaveForLater
  );
}

// Driver: Refresh Prestige Cart Drawer when SFL items are added to cart
_swat.evtLayer.addEventListener('sw:movedToCartfromSFL', function(e) {
  var data = e.detail.d.productData;
  console.log("Moved to cart from SFL", data);

  document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true, cancelable: true }));
});

_swat.evtLayer.addEventListener('sw:movedAllToCartAllFromSFL', function(e) {
  var data = e.detail.d.productData;
  console.log("Moved all to cart from SFL", data);
  
  document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true, cancelable: true }));
});

/*
class SavedForLaterList extends HTMLElement {
  constructor() {
    super();
    console.log('init sfl list')
    this.sflCallback();
   
  }

  sflCallback(event) {
      let onSuccess = function(response) {
          const lid = response.listid
          console.log("Successfully Initialized, And we created a Save for Later List", response);

          let onFetchSuccess = function(response) {
              console.log(response)
          }

          _swat.SaveForLater.fetch(lid, onFetchSuccess)
      }
      
      let onError = function(error) {
          // Error is an xhrObject
          console.log("There was an Error, while creating the Save For Later List", error);
      }
      
      // Call the Init function.
      _swat.SaveForLater.init(onSuccess.bind(this), onError);
  }
}

if (!customElements.get('saved-for-later-list')) {
  customElements.define(
    'saved-for-later-list', SavedForLaterList
  );
} 
*/
