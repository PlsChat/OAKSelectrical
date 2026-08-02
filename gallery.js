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
    ["photo-000.jpg", "Completed food-to-go servery and chilled display, ready for opening day"],
    ["photo-001.jpg", "Feature neon and illuminated signage over a new retail servery"],
    ["photo-002.jpg", "Commercial kitchen fit-out — extraction canopy, wash-down sink and power"],
    ["photo-003.jpg", "Stainless extraction canopy with integrated lighting over the cook line"],
    ["photo-004.jpg", "Distribution board installation and final connections on a live retail fit-out"],
    ["photo-005.jpg", "Back-of-house plant room — power supply and distribution"],
    ["photo-006.jpg", "Back-of-house stores — lighting, power and containment"]
  ],

  temporary: [
    ["photo-007.jpg", "Mobile temporary power board — 240V, 16A and 32A outlets with task lighting"],
    ["photo-008.jpg", "Portable distribution board feeding multiple socket circuits on site"],
    ["photo-009.jpg", "Testing and commissioning a temporary supply in an occupied building"],
    ["photo-010.jpg", "Temporary supply and first-fix cabling during a strip-out"],
    ["photo-011.jpg", "Temporary lighting and power keeping a live fit-out moving"],
    ["photo-012.jpg", "Temporary lighting installed while ceiling works continue"]
  ],

  insurance: [
    ["photo-023.jpg", "Fully re-wired consumer unit with RCBO and surge protection, tested and certified"],
    ["photo-024.jpg", "Commercial distribution board with individually labelled circuits and surge protection"],
    ["photo-025.jpg", "New circuit run to a light switch during insurance reinstatement works"],
    ["photo-026.jpg", "Scaffolding and temporary weather protection during major reinstatement works"],
    ["photo-027.jpg", "Testing and inspection of the incoming supply and isolator during reinstatement"]
  ],

  renewables: [
    ["photo-019.jpg", "Roof-mounted all-black solar PV array on a pitched tiled roof"],
    ["photo-020.jpg", "Solar PV panels rail-mounted and clamped on a completed roof array"],
    ["photo-021.jpg", "myenergi Zappi EV charge point installed with neat external cable containment"],
    ["photo-022.jpg", "Solar PV array installed on a slate roof from scaffold access"]
  ],

  firealarms: [
    ["photo-013.jpg", "Addressable fire alarm control panel installed and commissioned to BS 5839"],
    ["photo-014.jpg", "Multi-zone addressable fire alarm panel with zone plan, designed and installed to BS 5839"],
    ["photo-015.jpg", "Conventional fire alarm panel and manual call point, supplied, installed and tested"],
    ["photo-016.jpg", "Optical smoke detector fitted to a suspended ceiling grid"],
    ["photo-017.jpg", "Apollo manual call point (break-glass) installed and zone-labelled"],
    ["photo-018.jpg", "Fire alarm sounder bell providing audible warning"]
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
