class SEOReceiver {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.timeout = null;

    window.addEventListener('message', (event) => {
      const { data, origin } = event;
      const { action } = data;
      if (this[action] && origin === window.location.origin) this[action](data);
    });

    this.timeout = setInterval(() => {
      if (document.readyState === 'complete') {
        window.parent.postMessage({ action: 'seo-check-ready' }, window.location.origin);
        clearInterval(this.timeout);
      }
    }, 500);
  }

  checkSEO() {
    const warnings = [];

    this.validateHeadingStructure(warnings);
    // this.checkMetaDescription(warnings);

    this.sendWarnings(warnings);
  }


  validateHeadingStructure(warnings) {
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const h1s = headings.filter((h) => h.tagName.toLowerCase() === 'h1');

    // Rule 1: One and only one <h1>, and it's the first heading
    if (h1s.length === 0) {
      warnings.push('Missing <h1> tag.');
    } else if (h1s.length > 1) {
      warnings.push(`Multiple <h1> tags found: ${h1s.length}. There should only be one <h1> tag per page.`);
    } else if (headings[0].tagName.toLowerCase() !== 'h1') {
      warnings.push('The first heading on the page is not an <h1>. The first heading should be an <h1>.');
    }

    let passedH1 = false;
    let lastLevel = 0;

    headings.forEach((el, idx) => {
      const tag = el.tagName.toLowerCase();
      const level = parseInt(tag[1]);
      const text = el.textContent.trim();

      if (tag === 'h1') {
        if (passedH1 && idx !== 0) {
          const message = `Additional <h1> found again at heading position ${idx + 1}: "${text}" — only one <h1> is allowed, and it should be the first heading on the page.`;
          this.underlineAndWarn(el, 'red', message);
          warnings.push(message);
        }

        passedH1 = true;
      }

      else if (passedH1) {
        // Rule 2: The heading after h1 must be h2
        if (idx === 1 && tag !== 'h2') {
          const message = `Heading after <h1> should be <h2>, found <${tag}>: "${text}"`;
          this.underlineAndWarn(el, 'orange', message);
          warnings.push(message);
        }

        // Rule 3: Disallow downward level skips (e.g., h2 → h4)
        if (lastLevel && level > lastLevel + 1) {
          const message = `Skipped heading level from <h${lastLevel}> to <h${level}> at heading position ${idx + 1}: "${text}" — consider using <h${lastLevel + 1}> with a font size style instead.`;
          this.underlineAndWarn(el, 'yellow', message);
          warnings.push(message);
        }
      }

      lastLevel = level;
    });
  }

  checkMetaDescription(warnings) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || !metaDesc.getAttribute('content') || !metaDesc.getAttribute('content').trim()) {
      warnings.push('Missing or empty meta description tag. Recommend adding a meta description to the page for better SEO - Found in the Page\'s SEO tab.');
    }
  }

  underlineAndWarn(element, color, warning) {
    element.style.textDecoration = `underline wavy ${color}`;
    element.style.textDecorationThickness = '2px';
    let timeout = null;
    let canHover = true;

    // Handler for mouseenter
    const handler = () => {
      if (!canHover) return;
      this.sendWarnings([warning]);

      canHover = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => canHover = true, 6000);
    };

    element.addEventListener('mouseenter', handler);
  }

  sendWarnings(warnings = []) {
    warnings.forEach((warning) => {
      try {
        window.parent.jQuery.noticeAdd({
          text: '⚠️ SEO Recommendation: ' + warning,
          type: 'warning',
          stay: false
        });
      } catch (error) {
        console.log('Error sending toast notification:', error);
      }
    });
  }
}

if (window.self !== window.top) {
  new SEOReceiver();
}
