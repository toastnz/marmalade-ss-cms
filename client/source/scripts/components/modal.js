/* ---------------------------------------------
Import Modal
--------------------------------------------- */

import ModalController from '@meteora-digital/modal';

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

// Create a new modal controller
const Modal = new ModalController({
  className: 'marmalade-modal'
});

DomObserver.observe('.editor__file-preview-link', (links) => {
  links.forEach((link) => {
    // Find the link's image
    const image = new Image();

    image.src = link.href;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Empty everything from the modal
      Modal.empty();
      // Add the image to the modal
      Modal.append(image);
      // Show the modal
      if (window.innerWidth > 768) Modal.open();
    });
  });
});
