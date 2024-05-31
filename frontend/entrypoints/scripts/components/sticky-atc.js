/*
How To Use Custom Theme:

Add the .js-static-atc to the atc you want to base this visuality of the sticky atc off of. 
Add the relative html below to the page.
Modify based on requirements.
*/

//Custom Theme HTML
/*
<sticky-atc class="fixed bottom-0 left-0 z-10 w-full bg-white lg:hidden">
  <div
    class="flex flex-col items-center justify-center">
    <div class="flex items-start justify-between w-full max-w-md row-start-1 px-8 my-5 lg:px-0 lg:flex-col lg:mt-40" id="productInfo">
      <h3 class="row-start-2 mb-0 mr-4 text-sm font-light capitalize lg:mb-1 lg:text-lg lg:mr-0">{{ product.title }}</h3>
      <div class="flex h-full items-bottom w-max lead">
        {% render 'global-price' product: product, use_variant: true, price_class: 'js-main-price no-underline lg:text-sm text-xs leading-4' %}
      </div>
    </div>
    <!-- Add To Cart -->
    {%- if product != blank -%}
      <div id="product-form-{{ section.id }}" class="w-full max-w-md row-start-2 px-8 mb-6 lg:mt-10 lg:mb-10 product-form-container bg-light-gray lg:bg-transparent lg:px-0">
        {%- liquid
     assign gift_card_recipient_feature_active = false
     if block.settings.show_gift_card_recipient and product.gift_card?
       assign gift_card_recipient_feature_active = true
     endif
   -%}

        <div class="product-form__buttons">
          {%- liquid
           assign check_against_inventory = true
           if product.selected_or_first_available_variant.inventory_management != 'shopify' or  product.selected_or_first_available_variant.inventory_policy == 'continue'
             assign check_against_inventory = false
           endif
           if product.selected_or_first_available_variant.quantity_rule.min > product.selected_or_first_available_variant.inventory_quantity and check_against_inventory
             assign quantity_rule_soldout = true
           endif
         -%}
          <button
            id="ProductSubmitButton-{{ section.id}}"
            type="submit"
            name="add"
            class="w-full text-white transition-colors ease-in-out border lg:bg-transparent border-brand-secondary-100 bg-brand-primary-100 hover:bg-brand-primary-100 lg:text-brand-primary-100 lg:hover:text-white lg:h-14 h-10 js-atc
            {% if product.selected_or_first_available_variant.available == false or quantity_rule_soldout %}klaviyo-bis-trigger{% endif %}"
            {%- if product.selected_or_first_available_variant.available == false or quantity_rule_soldout -%}
            disabled
            {% endif %}>
            <span class="text-sm uppercase">
              {%- if product.selected_or_first_available_variant.available == false or quantity_rule_soldout -%}
                {{ 'products.product.sold_out' | t }}
              {%- else -%}
                {%- if product.metafields.custom.preorder -%}
                  Pre-Order
                {%- else -%}
                  {{ 'products.product.add_to_cart' | t }}
                {%- endif -%}
              {%- endif -%}
            </span>
          </button>
        </div>
      </div>
    {%- else -%}
      <div class="w-full max-w-md px-8 text-white bg-brand-secondary-100 hover:bg-brand-primary-100 product-form lg:px-0">
        <div class="product-form__buttons form">
          <button
            type="submit"
            name="add"
            class="product-form__submit button button--full-width button--primary js-atc"
            disabled>
            {{ 'products.product.sold_out' | t }}
          </button>
        </div>
      </div>
    {%- endif -%}
  </div>
</sticky-atc>
*/

//Prestige Theme HTML
/*

*/
class StickyATC extends HTMLElement {
    constructor() {
      super();
      this.scrollThreshold = 0; // Set scroll distance threshold
      this.atcStatic = document.querySelector('.js-static-atc');
      this.atcSticky = document.querySelector('.js-sticky-atc');
    //this.footer = document.querySelector('.footer')
      
      if(this.atcSticky) this.atcSticky.addEventListener('click', this.onClickHandler.bind(this));

      // Get the submit button within the atcStatic div
      this.submitButton = this.atcStatic.querySelector('button[type="submit"]');

      // Create a MutationObserver to observe changes to the disabled attribute of the submit button
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
            // When the disabled attribute of the submit button changes, check if it's removed
            if (!this.submitButton.disabled) {
              // If the disabled attribute is removed, remove the scroll attribute from atcSticky
              this.atcSticky.removeAttribute('scroll');
            }
          }
        });
      });

      // Start observing the disabled attribute of the submit button
      this.observer.observe(this.submitButton, { attributes: true });
      
    }
  
    connectedCallback() {
      console.log('init sticky CTA')
      const handleIntersection = (entries) => {
        entries.forEach(entry => {
          if (entry.target === this.atcStatic) {
            if (entry.isIntersecting) {
              this.classList.add('hidden');
              this.classList.remove('block');
            } else {
              this.classList.remove('hidden');
              this.classList.add('block');
            }
          } /* else if (entry.target === this.footer) {
            if (entry.isIntersecting) {
              this.classList.add('hidden');
              this.classList.remove('block');
            } else {
              this.classList.remove('hidden');
              this.classList.add('block');
            }
          } */
        });
      }
      const options = {
        root: null, // using the viewport as the root
        rootMargin: '0px', // top and bottom margins are set to -100px
        threshold: this.scrollThreshold // callback will be triggered as soon as even one pixel is visible
      };

      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(this.atcStatic);
    //observer.observe(this.footer);
    }

    onClickHandler(evt) {
      if(this.atcSticky.getAttribute('scroll') === 'true') {
        evt.preventDefault();

        const elementPosition = this.atcStatic.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - (window.innerHeight / 2)

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

      }

    }

  }
  
  customElements.define('sticky-atc', StickyATC);
