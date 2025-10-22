/* ---------------------------------------------------------------
Document Setup
------------------------------------------------------------------ */

DomObserver.observe('input[type="text"][min][max][step]', (inputs) => {
  inputs.forEach((input) => {
    // Gran the parent of the input
    const parent = input.parentNode;
    // Get the units, if there are any
    const units = input.getAttribute('units') || '';
    // grab the value
    let value = input.getAttribute('value');

    // remove any commas
    if (value) value = value.replace(/,/g, '');

    // Change the input type to range
    input.type = 'range';

    // Set the input value to the new numeric value
    input.value = value;

    // Add a class to the parent
    parent.classList.add('marmalade-range-slider');
    // Add a value data attribute to the parent
    parent.setAttribute('data-value', input.value + units);

    // When the input changes
    input.addEventListener('input', () => {
      // Update the parent data attribute
      parent.setAttribute('data-value', input.value + units);
    });
  });
});
