/*
Silverstripe has a font that uses data-icon="X" to display a single icon,
some modules have entered the value like "Accept" or "Cancel" which is not correct as it displays multiple icons!
This will just remove the attribute if it is more than 1 character long
*/

DomObserver.observe('[data-icon]', (elements) => {
  elements.forEach((element) => {
    const value = element.getAttribute('data-icon');
    if (value.length > 1) element.removeAttribute('data-icon');
  });
});
