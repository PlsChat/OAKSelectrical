/* ==========================================================================
   Oaks Electrical — photo galleries
   --------------------------------------------------------------------------
   TO ADD OR CHANGE PHOTOS, EDIT THE LIST BELOW. Nothing else needs touching.

   Every photo sits in assets/photos/ as photo-000.jpg through photo-099.jpg,
   each with a matching th-photo-000.jpg thumbnail. Put the filename in the
   set it belongs to, with a short caption. The caption shows under the photo
   and is also the alt text, so write something descriptive — it helps with
   search rankings and with screen readers.

   Example:
     fitout: [
       ["photo-004.jpg", "New distribution board, Morrisons overnight refit"],
       ["photo-011.jpg", "Ceiling grid containment before boarding"]
     ]

   A set with an empty list just hides its gallery — the page still works.
   ========================================================================== */

window.OAKS_PHOTOS = {

  fitout: [
    // ["photo-000.jpg", "Caption goes here"],
  ],

  temporary: [
  ],

  insurance: [
  ],

  renewables: [
  ],

  firealarms: [
  ]

};

/* ---------------------------------------------------------------------- */
/* Rendering and lightbox — no need to edit below this line.               */
/* ---------------------------------------------------------------------- */

(function () {
  'use strict';

  var sets = window.OAKS_PHOTOS || {};

  document.querySelectorAll('[data-gallery]').forEach(function (host) {
    var list = sets[host.getAttribute('data-gallery')] || [];

    if (!list.length) {
      var section = host.closest('[data-gallery-section]');
      if (section) section.hidden = true;
      return;
    }

    var grid = document.createElement('div');
    grid.className = 'grid-photos';

    list.forEach(function (item, i) {
      var file = item[0];
      var caption = item[1] || '';

      var fig = document.createElement('figure');
      fig.className = 'shot';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shot__btn';
      btn.setAttribute('aria-label', 'Enlarge photo: ' + (caption || 'site photograph'));
      btn.dataset.full = 'assets/photos/' + file;
      btn.dataset.caption = caption;

      var img = document.createElement('img');
      img.src = 'assets/photos/th-' + file;
      img.alt = caption || 'Oaks Electrical site photograph';
      img.loading = i < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';

      btn.appendChild(img);
      fig.appendChild(btn);

      if (caption) {
        var cap = document.createElement('figcaption');
        cap.textContent = caption;
        fig.appendChild(cap);
      }

      grid.appendChild(fig);
    });

    host.appendChild(grid);
  });

  /* --- Lightbox ---------------------------------------------------------- */

  var box = null;
  var lastFocus = null;

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.hidden = true;
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<figure class="lightbox__fig"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('.lightbox__close')) close();
    });
  }

  function open(src, caption) {
    if (!box) build();
    lastFocus = document.activeElement;
    var img = box.querySelector('img');
    img.src = src;
    img.alt = caption || '';
    box.querySelector('figcaption').textContent = caption || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.lightbox__close').focus();
  }

  function close() {
    if (!box) return;
    box.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.shot__btn');
    if (btn) open(btn.dataset.full, btn.dataset.caption);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
}());
