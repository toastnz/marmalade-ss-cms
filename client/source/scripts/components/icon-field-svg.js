DomObserver.observe('.IconField img, #Root_Templates img', (icons) => {
  icons.forEach((icon) => {
    // if the icon's src is svg extension
    if (icon.src.includes('.svg')) {
      // new xhr request to get the svg html
      const xhr = new XMLHttpRequest();
      // Open the request
      xhr.open('GET', icon.src, true);
      // When the request is loaded
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Add the svg html to the icon's parent element
          if (!icon.nextElementSibling) icon.parentNode.innerHTML += xhr.responseText;
        }
      }

      // Send the request
      xhr.send();
    }
  });
});
