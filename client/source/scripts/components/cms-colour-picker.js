class DarkmodeController {
  constructor() {
    // The various mode settings
    this.settings = ['on', 'off', 'auto'];
    // The current setting
    this.currentSetting = 0;
    // Create a button to toggle the darkmode
    this.button = document.createElement('button');

    // Add some classes to the button
    this.button.classList.add('silverstripe-cms-toolbar-icon', 'silverstripe-cms-toolbar-icon--darkmode');

    // When we click the button, switch the darkmode state
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchDarkMode()
    });

    // Initialise the darkmode
    this.setDarkMode(this.getDarkMode());
  }

  getDarkMode() {
    return window.localStorage.getItem('silverstripe-cms-darkmode') || 'auto';
  }

  switchDarkMode() {
    // Cycle forward through the settings
    this.currentSetting = (this.currentSetting == this.settings.length) ? 0 : this.currentSetting + 1;
    // Set the darkmode
    this.setDarkMode(this.settings[this.currentSetting]);
  }

  setDarkMode(value = 'on') {
    window.localStorage.setItem('silverstripe-cms-darkmode', value);
    document.body.setAttribute('data-darkmode', value);
    this.button.setAttribute('data-darkmode', value);
    this.currentSetting = this.settings.indexOf(value);
  }
}

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

const Darkmode = new DarkmodeController();

class CmsColourPicker extends HTMLElement {
  constructor() {
    super();
    // Find the template element
    this.template = this.querySelector('template');
    // Find all the colour values
    this.colours = this.getAttribute('data-colours').split(',');
    // Create a style tag
    this.styleTag = document.createElement('style');
    // Add the style tag to the document head
    document.head.appendChild(this.styleTag);

    // Render the inputs on the settings page
    if (window.location.pathname.startsWith('/admin/settings')) this.render();

    // Add the darkmode button to the south toolbar
    this.appendChild(Darkmode.button);

    // Remove the template
    this.removeChild(this.template);
  }

  render() {
    // Grab the innerHTML of the template
    const template = this.template.innerHTML;

    // Loop the colours
    this.colours.forEach((value, index) => {
      let html = template;
      // Put the data in an object
      const data = { value: value.trim(), index };
      // Create a div to hold the html
      const div = document.createElement('div');

      // Loop through the data object, and replace the {{variables}} that match the data keys with the data values
      Object.entries(data).forEach(([key, value]) => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });

      // Add the html to the div
      div.innerHTML += html;

      // Append the first child of the div to the custom element
      this.appendChild(div.firstElementChild);
    });

    // Add event listeners to the inputs
    [...this.querySelectorAll('input')].forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) this.handleColourChange(input.value);
      });
    });
  }

  connectedCallback() {
    this.loadSelectedColour();
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.handleColourChange.bind(this));
  }

  handleColourChange(value) {
    localStorage.setItem('cms-theme-colour', value);
    this.updateThemeColour(value);
  }

  loadSelectedColour() {
    // Check if a colour has been saved
    const savedColour = localStorage.getItem('cms-theme-colour');

    // If a colour has been saved, set it as the theme colour
    if (savedColour) {
      this.updateThemeColour(savedColour);
      const radioInput = this.querySelector(`input[value="${savedColour}"]`);
      if (radioInput) {
        radioInput.checked = true;
      }
    }

    // Otherwise set the first colour as the default
    else {
      const radioInput = this.querySelector('input');

      // If we have an input
      if (radioInput) {
        radioInput.checked = true;
        this.handleColourChange(radioInput.value);
      }

      // Otherewise set the default colour
      else {
        this.handleColourChange(this.colours[0]);
      }
    }
  }

  // Function to update the theme colour
  updateThemeColour(colour) {
    const brightness = this.getBrightness(colour);
    const accentTextColour = brightness > 124 ? '#000' : '#fff';
    this.styleTag.textContent = `:root, body { --cms-theme: ${colour}!important; --cms-accent-text-colour: ${accentTextColour}!important; }`;
  }

  // Function to get the brightness of a colour
  getBrightness(color) {
    let r, g, b;
    if (color.charAt(0) === '#') {
      color = color.substring(1);
      if (color.length === 3) {
        r = parseInt(color.charAt(0) + color.charAt(0), 16);
        g = parseInt(color.charAt(1) + color.charAt(1), 16);
        b = parseInt(color.charAt(2) + color.charAt(2), 16);
      } else if (color.length === 6) {
        r = parseInt(color.substring(0, 2), 16);
        g = parseInt(color.substring(2, 4), 16);
        b = parseInt(color.substring(4, 6), 16);
      }
    } else {
      const rgb = color.replace(/[^\d,]/g, '').split(',');
      r = parseInt(rgb[0]);
      g = parseInt(rgb[1]);
      b = parseInt(rgb[2]);
    }
    const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    return brightness;
  }
}

customElements.define('cms-colour-picker', CmsColourPicker);
