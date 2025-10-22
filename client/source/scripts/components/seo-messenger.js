class SEOMessenger {
  constructor() {
    this.initialised = false;
    this.iframes = [];
    this.previewIframe = null;

    // Listen for the block previews ready message
    window.addEventListener('message', (event) => {
      if (event.data.action === 'seo-check-ready') this.checkSEO();
    });
  }

  iframeExists() {
    // Look for all iframes on the page
    this.iframes = [...document.querySelectorAll('iframe')];
    // Find the preview iframe again if it is not found
    this.previewIframe = this.iframes.find((iframe) => iframe.src.includes('CMSPreview'));
    // Resturn false if the preview iframe is not found
    if (!this.previewIframe) return false;
    // If there is not contentWindow, return false
    if (!this.previewIframe.contentWindow) return false;

    return true;
  }

  checkSEO() {
    // Make sure the iframe exists
    if (!this.iframeExists()) return;

    // Post a message to the iframe to check the SEO
    this.previewIframe.contentWindow.postMessage({
      action: 'checkSEO',
    }, window.location.origin);
  }


}

new SEOMessenger();
