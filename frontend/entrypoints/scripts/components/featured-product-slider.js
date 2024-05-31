import { Splide } from "@splidejs/splide";

// JavaScript code for the custom web component
class FeaturedProductSlider extends HTMLElement {
    constructor() {
      super();
    }

    // Method to hide product description content except the first paragraph
    hideContentExceptFirstParagraph() {
        this.querySelectorAll('.product-info__block-item[data-block-type="description"]').forEach(description => {
            // Check if the container exists inside the current slide
            if (description) {
                // Select all paragraph and h5 elements within the container
                const elements = description.querySelectorAll('p, h5');
                // Loop through all elements starting from the second one
                for (let i = 1; i < elements.length; i++) {
                    elements[i].style.display = 'none'; // Hide each element except the first paragraph
                }
            }
        });
    }
  
    connectedCallback() {
        // Initialize the Splide slider
        const splide = new Splide(this, {
            perPage    : 1,
            perMove    : 1,
            pagination : false,
            arrows     : true,
            arrowPath  : 'm2.2742.9395 20 19.9999-20 20.0001-2.1149-2.115 17.8851-17.8851-17.8851-17.885 2.1149-2.1149z',
            classes    : {
              arrows: 'splide__arrows',
              arrow : 'splide__arrow prev-next-button',
              prev  : 'splide__arrow--prev prev-next-button--prev',
              next  : 'splide__arrow--next prev-next-button--next',
            }
        }).mount();

        // Apply the hiding logic immediately upon initialization
        this.hideContentExceptFirstParagraph();

        // Re-apply the hiding logic every time the slider moves
        splide.on('moved', () => {
            this.hideContentExceptFirstParagraph();
        });
    }
}

customElements.define('featured-product-slider', FeaturedProductSlider);
