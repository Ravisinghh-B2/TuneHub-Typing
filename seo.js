/**
 * SEO Manager for TuneHub
 * Handles dynamic updates of Title, Meta Tags, Open Graph, and Structured Data
 */
class SEOManager {
    constructor() {
        this.defaultTitle = "TuneHub | Minimalist Typing Test";
        this.defaultDescription = "Improve your typing speed with TuneHub. A minimalist, dark-themed typing test featuring coding practice, custom modes, and real-time statistics.";
        this.baseUrl = window.location.origin;
    }

    /**
     * Update all SEO tags for a specific page/route
     * @param {string} page - The page identifier (e.g., 'home', 'account', 'settings')
     * @param {object} data - Optional data for dynamic content
     */
    update(page, data = {}) {
        let title = this.defaultTitle;
        let description = this.defaultDescription;
        let path = "/";

        switch (page) {
            case 'home':
            case 'test':
                title = "TuneHub | Typing Test";
                description = "Test your WPM and accuracy with our minimalist typing test. Support for multiple modes including quotes and code.";
                path = "/";
                break;
            case 'account':
                title = "My Profile | TuneHub";
                description = "View your typing statistics, history, and account settings on TuneHub.";
                path = "/#account";
                break;
            case 'settings':
                title = "Settings | TuneHub";
                description = "Customize your TuneHub experience. Change themes, adjust caret styles, and configure sound settings.";
                path = "/#settings";
                break;
            case 'about':
                title = "About TuneHub";
                description = "Learn about TuneHub, a project dedicated to providing a clean and distraction-free typing experience.";
                path = "/#about";
                break;
        }

        // DOM Updates
        document.title = title;
        this.setMeta('description', description);

        // Open Graph
        this.setOpengraph('og:title', title);
        this.setOpengraph('og:description', description);
        this.setOpengraph('og:url', this.baseUrl + path);

        // Twitter Card
        this.setMeta('twitter:title', title);
        this.setMeta('twitter:description', description);

        // Structured Data
        this.updateStructuredData(page);
    }

    setMeta(name, content) {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.name = name;
            document.head.appendChild(element);
        }
        element.content = content;
    }

    setOpengraph(property, content) {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.content = content;
    }

    updateStructuredData(page) {
        // Remove existing JSON-LD
        const existingScript = document.getElementById('json-ld-data');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.id = 'json-ld-data';
        script.type = 'application/ld+json';

        const baseSchema = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TuneHub",
            "url": this.baseUrl,
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Any",
            "description": this.defaultDescription,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };

        if (page === 'home' || page === 'test') {
            // Add specific Breadcrumbs or Actions if needed
        }

        script.textContent = JSON.stringify(baseSchema);
        document.head.appendChild(script);
    }
}

// Initialize
window.seoManager = new SEOManager();
