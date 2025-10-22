DomObserver.observe('.tox-tinymce', (elements) => {
  elements.forEach((tinymce) => {
    // Find the iframe within the TinyMCE editor
    const iframe = tinymce.querySelector('iframe');
    // Get all the toolbars within the TinyMCE editor
    const toolbars = tinymce.querySelectorAll('.tox-toolbar');
    // Find the last toolbar
    const lastToolbar = toolbars[toolbars.length - 1];
    // If there is no last toolbar, exit
    if (!lastToolbar) return;

    // Create a new button element
    const toggleButton = document.createElement('button');

    // The state of the background toggle
    let enabled = false;

    // Set up the button attributes
    toggleButton.className = 'tox-bg-toggle';
    toggleButton.innerText = 'Toggle Background';

    // Add an event listener to toggle the background color
    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Toggle the state
      enabled = !enabled;
      // Toggle between white and transparent
      iframe.style.setProperty('--_background-colour', enabled ? 'black' : 'white');
      toggleButton.classList.toggle('active', enabled);
    });

    // Append the button to the last toolbar
    lastToolbar.appendChild(toggleButton);
  });
});
