export class TextReveal extends HTMLElement {
    constructor() {
        super();

        // Attributes
        this.originalText = this.getAttribute('text');
        this.truncateBy = this.getAttribute('truncate-by') || 'words'; // Default to words if not specified
        this.truncateValue = parseInt(this.getAttribute('truncate-value'), 10) || 30; // Adjusted for clarity
        this.ctaText = this.getAttribute('cta-text') || 'Read'; // Default text for CTA

        // Initialization
        this.init();
    }

    init() {
        this.contentContainer = document.createElement('div'); // Use span for inline display of Read More
        this.updateContent();
        this.appendChild(this.contentContainer);
        if (this.needsTruncation()) {
            this.button = this.createButton(); // Store button for text toggle
            this.appendChild(this.button);
        }
    }

    updateContent() {
        let { visibleText, hiddenText } = this.getTruncatedText();
        this.contentContainer.innerHTML = visibleText; // Set the visible text
        if (hiddenText) {
            this.hiddenSpan = document.createElement('span');
            this.hiddenSpan.className = 'text-reveal-hidden';
            this.hiddenSpan.style.display = 'none';
            this.hiddenSpan.innerHTML = hiddenText; // Insert the hidden text
            this.contentContainer.appendChild(this.hiddenSpan);
        }
    }

    getTruncatedText() {
        if (this.truncateBy === 'paragraph') {
            // Split paragraphs while retaining <p> tags to accurately preserve HTML structure.
            const paragraphs = this.originalText.match(/<p[^>]*>.*?<\/p>/g) || [];
            const visibleTextParts = paragraphs.slice(0, this.truncateValue);
            const hiddenTextParts = paragraphs.slice(this.truncateValue);
    
            // Directly join without adding or removing <p> tags.
            const visibleText = visibleTextParts.join('');
            const hiddenText = hiddenTextParts.join('');
    
            return {
                visibleText, // No extra processing needed
                hiddenText // Directly use joined result
            };
        } else { // Truncate by words
            // More aggressively remove all forms of <p> tags, including those with attributes.
            // Assuming this.originalText contains the HTML content
            // Use commented code for a richtext metafield - active code is for multiline text
        // const regex = /<div class="metafield-rich_text_field">([\s\S]*?)<\/div>/g;
        // this.originalText = this.originalText.replace(regex, '$1');
            const textWithExtraBrTags = this.originalText.replace(/<br\s*\/?>/g, '<br><br>'); // Special fix for client-specific formatting
            const textWithoutPTags = textWithExtraBrTags.replace(/<\/?p[^>]*>/g, ' ');
            const words = textWithoutPTags.split(/\s+/); // Split by any whitespace
            const visibleText = words.slice(0, this.truncateValue).join(' ');
            const hiddenText = words.slice(this.truncateValue).join(' ');
    
            return {
                visibleText, // No <p> tags here, since we're not structuring in paragraphs
                hiddenText: hiddenText ? `&nbsp;${hiddenText}` : '' // Ensure hiddenText is never null and prepend &nbsp;
            };
        }
    }

    needsTruncation() {
        if (this.truncateBy === 'paragraph') {
            // Use a more accurate way to count paragraphs, accounting for HTML structure.
            const paragraphs = this.originalText.match(/<p[^>]*>.*?<\/p>/g) || [];
            return paragraphs.length > this.truncateValue;
        } else { // Truncate by words
            // Consider text without HTML tags to get a more accurate word count.
            const textWithoutTags = this.originalText.replace(/<[^>]+>/g, ' ');
            const words = textWithoutTags.split(/\s+/).filter(Boolean); // Split by whitespace and filter out empty strings
            return words.length > this.truncateValue;
        }
    }    
    
    createButton() {
        const button = document.createElement('button');
        button.textContent = `+ ${this.ctaText} More`; // Initial button text
        button.addEventListener('click', () => this.toggleText());
        return button;
    }

    toggleText() {
        const isHidden = this.hiddenSpan.style.display === 'none';
        if (this.truncateBy === 'paragraph') {
            this.hiddenSpan.style.display = isHidden ? 'block' : 'none'; // Toggle display of hidden text
        } else { 
            this.hiddenSpan.style.display = isHidden ? 'inline' : 'none'; // Toggle display of hidden text
        }
        this.button.textContent = isHidden ? `— ${this.ctaText} Less` : `+ ${this.ctaText} More`; // Toggle button text
    }
}

customElements.define('text-reveal', TextReveal);
