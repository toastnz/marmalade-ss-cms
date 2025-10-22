DomObserver.observe('input.cms-character-count, textarea.cms-character-count', (inputs) => {
  inputs.forEach((input) => {
    const parent = input.parentElement;
    const counter = document.createElement('span');
    const update = () => counter.textContent = input.value.length;
    counter.className = 'cms-character-count__counter';
    input.addEventListener('input', update);
    update();
    // If the input has a next sibling, insert the counter after it
    if (input.nextElementSibling) {
      parent.insertBefore(counter, input.nextElementSibling);
    } else {
      parent.appendChild(counter);
    }
  });
});
