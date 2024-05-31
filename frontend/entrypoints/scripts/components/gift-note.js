function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

var GiftNote = class extends HTMLElement {
  constructor() {
    super();
    this.textareaFieldName = "attributes[free-gift-note]";
    this.giftNoteFieldName = "free-gift-note";
    this.mirroredGiftNoteFieldName = "gift-note";
    this.upsellProductId = '31623838924849'; // Set the upsell product ID
    this.addEventListener("change", this.onNoteChanged.bind(this));
    console.log("GiftNote constructor called");
  }

  connectedCallback() {
    console.log("GiftNote connected");
    this.populateGiftMessage();
    this.setupCartChangeListener();
  }

  populateGiftMessage() {
    console.log("Populating gift message");
    this.fetchCartData().then(cart => {
      this.updateGiftNoteField(cart);
    });
  }

  onNoteChanged(event) {
    console.log("Note changed event triggered", event);
    if (event.target.name === this.textareaFieldName) {
      let giftNoteValue = event.target.value;
      console.log("Gift note changed:", giftNoteValue);
      this.updateGiftNoteInCart(giftNoteValue);
    }
  }

  fetchCartData() {
    return fetch(`${Shopify.routes.root}cart.js`)
      .then(response => response.json())
      .catch(error => console.error('Error fetching cart data:', error));
  }

  containsUpsellProduct(cart) {
    const upsellVariantId = this.upsellProductId.toString(); // Ensure string comparison
    console.log("Cart items:", cart.items); // Log cart items for inspection
    console.log("Looking for upsell product ID:", upsellVariantId);
  
    const isUpsellProductInCart = cart.items.some(item => item.id.toString() === upsellVariantId);
    console.log("Is upsell product in cart:", isUpsellProductInCart);
  
    return isUpsellProductInCart;
  }  

  updateCart(attributes) {
    console.log("Sending update cart request", attributes);
    fetch(`${Shopify.routes.root}cart/update.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attributes }),
      keepalive: true
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log('Cart updated successfully:', data))
    .catch(error => console.error('Error updating cart:', error));
  }

  updateGiftNoteField(cart) {
    const freeGiftNoteValue = cart.attributes[this.giftNoteFieldName] || '';
    const giftNoteTextarea = this.querySelector(`[name='${this.textareaFieldName}']`);
    if (giftNoteTextarea) {
      giftNoteTextarea.value = freeGiftNoteValue;
      console.log("Gift message field updated:", freeGiftNoteValue);
    }
  }

  updateGiftNoteInCart(giftNoteValue) {
    this.fetchCartData().then(cart => {
      let attributes = {};
      attributes[this.giftNoteFieldName] = giftNoteValue || '';
      if (this.containsUpsellProduct(cart)) {
        attributes[this.mirroredGiftNoteFieldName] = giftNoteValue;
      } else {
        attributes[this.mirroredGiftNoteFieldName] = '';
      }
      this.updateCart(attributes);
    });
  }

  setupCartChangeListener() {
    const debouncedCartChange = debounce(() => this.handleCartChange(), 300); // 300ms debounce
  
    document.addEventListener('click', (event) => {
      if (event.target.closest('.lineItem')) {
        console.log('Detected cart change via line-item click');
        debouncedCartChange();
      }
    });
  
    const textarea = this.querySelector(`[name='${this.textareaFieldName}']`);
    if (textarea) {
      textarea.addEventListener('change', debounce((event) => this.onNoteChanged(event), 300));
    }
  }
  
  handleCartChange() {
    this.fetchCartData().then(cart => {
      const freeGiftNoteValue = this.querySelector(`[name='${this.textareaFieldName}']`)?.value || '';
      let attributes = { [this.giftNoteFieldName]: freeGiftNoteValue };
  
      if (this.containsUpsellProduct(cart)) {
        attributes[this.mirroredGiftNoteFieldName] = freeGiftNoteValue;
      } else {
        attributes[this.mirroredGiftNoteFieldName] = '';
      }
  
      this.updateCart(attributes);
    });
  }
};

if (!window.customElements.get("gift-note")) {
  window.customElements.define("gift-note", GiftNote);
  console.log("Custom element gift-note defined");
}
