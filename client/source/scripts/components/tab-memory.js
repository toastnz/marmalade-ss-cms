function updateMemory() {
  // if the page url doesnt start with admin/settings, empty the session storage
  if (!window.location.pathname.startsWith('/admin/settings')) {
    sessionStorage.removeItem('tab-history');
  }

  return JSON.parse(sessionStorage.getItem('tab-history')) || {};
}

updateMemory();

DomObserver.observe('ul.ui-tabs-nav', (tabsets) => {
  // Get the history from the session storage or an empty object
  const history = updateMemory();

  // Loop all the tabsets
  tabsets.forEach((tabset) => {
    const parentID = tabset.closest('[id]').id;
    // Find all the li elements
    const items = [...tabset.children];

    // Loop all the li elements
    items.forEach((item) => {
      // Get the aria-controls for this item
      const ID = item.getAttribute('aria-controls');
      // Find the link
      const link = item.querySelector('a');

      // Add a click event listener to the tab
      item.addEventListener('click', () => {
        history[parentID] = ID;

        // Store the history in the session storage
        sessionStorage.setItem('tab-history', JSON.stringify(history));
      });

      // Check if the tab is the last one that was clicked
      if (history[parentID] === ID) link.click();
    });
  });
});


DomObserver.observe('.cms-edit-form', (forms) => {
  forms.forEach((form) => form.classList.add('tabs-memory-updated'));
});
