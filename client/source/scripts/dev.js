/* ---------------------------------------------
Import styles
--------------------------------------------- */

import '../styles/dev.scss';

/* ---------------------------------------------
Document Setup
--------------------------------------------- */

// We want the dev build page to scroll to the bottom for us
(() => {
  if (window.location.pathname !== '/dev/build') return;

  const BuildObserver = new MutationObserver(() => {
    window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight);
  });

  const disconnect = (e) => {
    if (e.deltaY < 0) BuildObserver.disconnect();
    window.removeEventListener('wheel', disconnect);
  };

  BuildObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('wheel', disconnect, { passive: true });
})();
