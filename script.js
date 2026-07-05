const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const whatsappPhone = '918956527367';
const header = document.querySelector('.site-header');

document.body.classList.add('js-ready');

if (navToggle && siteNav) {
  navToggle.setAttribute('aria-expanded', 'false');
  siteNav.setAttribute('aria-hidden', 'true');

  const closeNav = () => {
    siteNav.classList.remove('active');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.setAttribute('aria-hidden', 'true');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('active');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    siteNav.setAttribute('aria-hidden', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = siteNav.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);
    if (!isClickInsideMenu && !isClickOnToggle && siteNav.classList.contains('active')) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('active')) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && siteNav.classList.contains('active')) {
      closeNav();
    }
  });
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href && href.includes('#')) {
      const targetId = href.split('#')[1];
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    if (siteNav && siteNav.classList.contains('active')) {
      siteNav.classList.remove('active');
      document.body.classList.remove('nav-open');
      siteNav.setAttribute('aria-hidden', 'true');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

document.addEventListener('dragstart', (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
  });

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add('active'));
}

const contactForm = document.getElementById('whatsapp-contact-form');

function gatherFormData() {
  if (!contactForm) {
    return null;
  }
  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const phone = contactForm.querySelector('input[name="phone"]').value.trim() || 'Not provided';
  const project = contactForm.querySelector('select[name="project_type"]').value || 'Not specified';
  const message = contactForm.querySelector('textarea[name="message"]').value.trim() || 'No additional details provided';
  return { name, email, phone, project, message };
}

function buildProfessionalText(data) {
  const timestamp = new Date().toLocaleString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  return `New Project Inquiry - ARK'S ASSOCIATES\n\n` +
         `Name: ${data.name}\n` +
         `Email: ${data.email}\n` +
         `Phone: ${data.phone}\n` +
         `Service: ${data.project}\n` +
         `Details:\n${data.message}\n\n` +
         `Submitted on: ${timestamp}`;
}

const sendWhatsappBtn = document.getElementById('send-whatsapp');
const formStatus = document.createElement('p');

function isFormReady(data) {
  if (!contactForm || !data) {
    return false;
  }
  const emailInput = contactForm.querySelector('input[name="email"]');
  return Boolean(data.name) && Boolean(emailInput && emailInput.checkValidity()) && data.project !== 'Not specified';
}

function updateActionButtons() {
  if (!sendWhatsappBtn) {
    return;
  }
  const data = gatherFormData();
  const ready = isFormReady(data);
  sendWhatsappBtn.disabled = !ready;
}

function setFormStatus(message, tone) {
  if (!contactForm) {
    return;
  }
  formStatus.className = `form-status ${tone}`;
  formStatus.textContent = message;
}

function setButtonBusy(button, busyLabel) {
  if (!button) {
    return;
  }
  if (!button.dataset.defaultLabel) {
    button.dataset.defaultLabel = button.textContent.trim();
  }
  button.textContent = busyLabel;
  button.disabled = true;
}

function resetButtonBusy(button) {
  if (!button) {
    return;
  }
  if (button.dataset.defaultLabel) {
    button.textContent = button.dataset.defaultLabel;
  }
  updateActionButtons();
}

if (contactForm) {
  const formActions = contactForm.querySelector('.form-actions');
  if (formActions) {
    formStatus.className = 'form-status';
    formStatus.setAttribute('role', 'status');
    formStatus.setAttribute('aria-live', 'polite');
    formActions.insertAdjacentElement('afterend', formStatus);
  }

  ['input', 'change'].forEach((eventName) => {
    contactForm.addEventListener(eventName, () => {
      updateActionButtons();
      if (formStatus.textContent) {
        setFormStatus('', '');
      }
    });
  });

  updateActionButtons();
}

if (sendWhatsappBtn && contactForm) {
  sendWhatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = gatherFormData();
    if (!isFormReady(data)) {
      setFormStatus('Please enter your name, a valid email address, and select a service.', 'error');
      return;
    }
    setButtonBusy(sendWhatsappBtn, 'Opening WhatsApp...');
    const text = buildProfessionalText(data);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setFormStatus('WhatsApp opened with your prefilled project details.', 'success');
    contactForm.reset();
    setTimeout(() => {
      resetButtonBusy(sendWhatsappBtn);
    }, 500);
  });
}

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
}, { passive: true });
