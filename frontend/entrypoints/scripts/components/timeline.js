var Timeline = class extends HTMLElement {
    constructor() {
      super();

        this.blocks = this.querySelectorAll(".multi-column__item");
        console.log(this.blocks)
        this.initObserver();

      if (Shopify.designMode) {
        this.addEventListener("shopify:block:select", (event) => {
          event.target.scrollIntoView({ inline: "center", block: "nearest", behavior: event.detail["load"] ? "auto" : "smooth" });
        });
      }
    }
    initObserver() {
        // Options for the observer (customize these if needed)
        const options = {
          root: null, // observing intersections relative to the viewport
          rootMargin: '0px',
          threshold: 0.1 // callback is executed when 50% of the target is visible
        };
    
        // Creating an intersection observer instance
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            // Check if the element is in view and if it has the 'opacity-0' class
            if (entry.isIntersecting) {
              entry.target.classList.remove('opacity-0');
            } else {
                entry.target.classList.add('opacity-0');
            }
          });
        }, options);
    
        // Observing each block element
        this.blocks.forEach(block => observer.observe(block));
      }
  };
  if (!window.customElements.get("timeline-reveal")) {
    window.customElements.define("timeline-reveal", Timeline);
  }