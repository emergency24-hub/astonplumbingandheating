/*
 * Aston Green Heating Ltd — Site Settings & Interactions
 *
 * EDIT BUSINESS DETAILS HERE.
 * Change these values once and every matching item on every page updates
 * automatically when the page loads.
 */

const SITE_CONFIG = {
  companyName: 'Aston Green Heating Ltd',

  phone: {
    display: '07418 354976',
    link: '07418354976'
  },

  email: 'info@astonplumbingandheating.co.uk',

  companyNumber: '17015324',

  address: [
    '171 Albert Road',
    'Birmingham',
    'England',
    'B6 5ND'
  ]
};

/* ============================================================
   BUSINESS INFORMATION
   ============================================================ */

function updateBusinessInformation() {
  // Company name
  document.querySelectorAll('[data-site-company]').forEach((element) => {
    element.textContent = SITE_CONFIG.companyName;
  });

  // Visible phone numbers
  document.querySelectorAll('[data-site-phone]').forEach((element) => {
    element.textContent = SITE_CONFIG.phone.display;
  });

  // Phone links
  document.querySelectorAll('[data-site-phone-link]').forEach((element) => {
    element.setAttribute('href', `tel:${SITE_CONFIG.phone.link}`);
  });

  // Email addresses
  document.querySelectorAll('[data-site-email]').forEach((element) => {
    if (SITE_CONFIG.email) {
      element.textContent = SITE_CONFIG.email;
    } else {
      element.closest('[data-site-email-link]')?.remove();
    }
  });

  document.querySelectorAll('[data-site-email-link]').forEach((element) => {
    if (SITE_CONFIG.email) {
      element.setAttribute('href', `mailto:${SITE_CONFIG.email}`);
    } else {
      element.remove();
    }
  });

  // Company number
  document.querySelectorAll('[data-site-company-number]').forEach((element) => {
    element.textContent = SITE_CONFIG.companyNumber;
  });

  // Address blocks
  document.querySelectorAll('[data-site-address]').forEach((element) => {
    element.innerHTML = SITE_CONFIG.address
      .map((line) => escapeHtml(line))
      .join('<br>');
  });

  // Keep the visible phone number in sync with the central business settings.
  document.querySelectorAll('[data-site-phone-display]').forEach((element) => {
    element.textContent = SITE_CONFIG.phone.display;
  });
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

/* ============================================================
   PAGE INTERACTIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateBusinessInformation();

  document.body.classList.add('has-js');

  /* ------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------ */
  const revealElements = [
    ...document.querySelectorAll('.section > .container'),
    ...document.querySelectorAll('.page-hero-in'),
    ...document.querySelectorAll('.emergency-in'),
    ...document.querySelectorAll('.service'),
    ...document.querySelectorAll('.step'),
    ...document.querySelectorAll('.gallery .g'),
    ...document.querySelectorAll('.contact-card, .contact-action')
  ];

  revealElements.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-index', index % 6);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------
     Header shadow
     ------------------------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');

  function updateHeader() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------ */
  const mobileMenuToggle = document.querySelector('.nav-toggle');
  const mobileMenuButton = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('.main-nav');

  if (mobileMenuToggle && mobileMenuButton && mainNavigation) {
    function closeMobileMenu() {
      mobileMenuToggle.checked = false;
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }

    function updateMenuButtonState() {
      const isOpen = mobileMenuToggle.checked;

      mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
      mobileMenuButton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation' : 'Open navigation'
      );
    }

    mobileMenuToggle.addEventListener('change', updateMenuButtonState);

    mainNavigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenuToggle.checked) {
        closeMobileMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!mobileMenuToggle.checked) return;
      if (event.target.closest('.site-header')) return;
      closeMobileMenu();
    });
  }

  /* ------------------------------------------------------------
     Services dropdown
     ------------------------------------------------------------ */
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    if (!summary) return;

    const updateDropdownState = () => {
      summary.setAttribute('aria-expanded', String(dropdown.open));
    };

    updateDropdownState();
    dropdown.addEventListener('toggle', updateDropdownState);
  });

  /* ------------------------------------------------------------
     Current year
     ------------------------------------------------------------ */
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
