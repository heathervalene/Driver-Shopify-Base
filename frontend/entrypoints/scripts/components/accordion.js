// JavaScript code for the custom web component
class Accordion extends HTMLElement {
    constructor() {
      super();
      this._header = this.querySelector('accordion-header');
      this._content = this.querySelector('accordion-content');
      this._arrow = this.querySelector('arrow');
      if(this.arrow) {
        this._arrow.classList.add('rotate-180');
      }
      this.bindEvents();
    }

    bindEvents(){
      this._header = this.querySelector('accordion-header');
      this._content = this.querySelector('accordion-content');
      this._arrow = this.querySelector('arrow');
      this.querySelector('accordion-header').addEventListener('click', this.toggle.bind(this))

      // Bind outsideClickListener only for filter toggle accordion
      if (this.querySelector('.filter__toggle')) {
        document.addEventListener('click', this.outsideClickListener.bind(this));
        }
      // Bind scroll listener if closeOnScroll attribute is present
      if (this.hasAttribute('closeOnScroll')) {
        window.addEventListener('scroll', this.close.bind(this));
      }
    }

    outsideClickListener(event) {
      // Check if the click is outside the filter toggle accordion - if it is, close it
      if (!this.contains(event.target) && this.querySelector('.filter__toggle')) {
          this.close();
      }
    }
  
    connectedCallback() {
      this.setAttribute('role', 'presentation');
      this._header.setAttribute('role', 'button');
      this._header.setAttribute('aria-expanded', 'false');
      this._content.setAttribute('role', 'region');
      this._content.setAttribute('aria-hidden', 'true');

      if(this.hasAttribute('startOpen')) {
        this._header.setAttribute('aria-expanded', 'true');
        const listHeight = this._content.firstElementChild.clientHeight;
        this._content.classList.add(`max-h-[${listHeight}px]`);
        this._content.classList.remove('max-h-0');
        if(this._arrow) {
          this._arrow.classList.remove('rotate-180');
        }
      }
    }
  
    toggle(manual=true) {
      const expanded = this._header.getAttribute('aria-expanded') === 'true';
      const accordionGroup = this.closest('accordion-group');
      
      // If it's a manual toggle and doesn't have keepOpen attribute, close other accordions
      if (manual && accordionGroup && !this.hasAttribute('keepOpen')) {
        accordionGroup.closeAllExcept(this);
      }

      if(expanded) {
        const listHeight = this._content.firstElementChild.clientHeight;
        this._content.classList.remove(`max-h-[${listHeight}px]`);
        this._content.classList.add('max-h-0');
        if(this._arrow){
          this._arrow.classList.add('rotate-180');
        }
        
      } else {
        const listHeight = this._content.firstElementChild.clientHeight;
        this._content.classList.add(`max-h-[${listHeight}px]`);
        this._content.classList.remove('max-h-0');
        if(this._arrow){
          this._arrow.classList.remove('rotate-180');
        }
        
      }
      this._header.setAttribute('aria-expanded', !expanded);
      this._content.setAttribute('aria-hidden', expanded);

      // If the accordion has the closeOnScroll attribute, hide or show the .apply__toggle element
      if (this.hasAttribute('closeOnScroll')) {
        const applyToggle = document.querySelector('.apply__toggle');
        if (applyToggle) {
          if (expanded) {
            applyToggle.classList.remove('block');
            applyToggle.classList.add('hidden');
          } else {
            applyToggle.classList.add('block');
            applyToggle.classList.remove('hidden');
          }
        }
      }

      const filterToggle = this._header.querySelector('.filter__toggle');
    
      if (filterToggle) {
          const plusIcon = filterToggle.querySelector('.plus');
          const minusIcon = filterToggle.querySelector('.minus');

          if (expanded) {
              plusIcon.classList.remove('hidden');
              minusIcon.classList.add('hidden');
          } else {
              plusIcon.classList.add('hidden');
              minusIcon.classList.remove('hidden');
          }
      }
    }
  
    open() {
      if (this._header.getAttribute('aria-expanded') !== 'true') {
        this.toggle(false);  // False because it's a programmatic toggle
      }
    }
  
    close() {
      if (this._header.getAttribute('aria-expanded') === 'true') {
        this.toggle(false);  // False because it's a programmatic toggle
      }
    }
  }
  
  class AccordionGroup extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.setAttribute('role', 'tablist');
    }
  
    closeAllExcept(exceptAccordion) {
      const accordions = Array.from(this.querySelectorAll('drop-down'));
      accordions.forEach((accordion) => {
        if (accordion !== exceptAccordion && !accordion.hasAttribute('keepOpen')) {
          accordion.close();
        }
      });
    }
 }
  
  class AccordionHeader extends HTMLElement {
    constructor() {
      super();
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', '0');
    }
  }
  
  class AccordionContent extends HTMLElement {
    constructor() {
      super();
      this.setAttribute('role', 'tabpanel');
    }
  }
  
  customElements.define('drop-down', Accordion);
  customElements.define('accordion-group', AccordionGroup);
  customElements.define('accordion-header', AccordionHeader);
  customElements.define('accordion-content', AccordionContent);
  