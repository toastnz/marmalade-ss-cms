DomObserver.observe('label', (labels) => {
  labels.forEach((label) => {
    const input = label.control;
    if (!input) return;
    // If the label has a title, return
    if (label.title && label.title != "") return;
    // Set the title to the input name
    label.title = '$' + input.name;
  });
});
