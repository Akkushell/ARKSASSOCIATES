const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const whatsappPhone = '918956527367';
const header = document.querySelector('.site-header');

document.body.classList.add('js-ready');

if (navToggle && siteNav) {
  navToggle.setAttribute('aria-expanded', 'false');

  const closeNav = () => {
    siteNav.classList.remove('active');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('active');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
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
}

const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .site-nav a[href*="index.html#"]');
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
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
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

function buildEmailBody(data) {
  const timestamp = new Date().toLocaleString();
  return `New Project Inquiry - ARK'S ASSOCIATES\r\n\r\n` +
         `Name: ${data.name}\r\n` +
         `Email: ${data.email}\r\n` +
         `Phone: ${data.phone}\r\n` +
         `Service: ${data.project}\r\n` +
         `Details: ${data.message}\r\n\r\n` +
         `Submitted on: ${timestamp}`;
}

const sendWhatsappBtn = document.getElementById('send-whatsapp');
const sendEmailBtn = document.getElementById('send-email');

if (sendWhatsappBtn && contactForm) {
  sendWhatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = gatherFormData();
    if (!data || !data.name || !data.email || data.project === 'Not specified') {
      alert('Please fill in your name, email and select a service before sending.');
      return;
    }
    const text = buildProfessionalText(data);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    contactForm.reset();
  });
}

if (sendEmailBtn && contactForm) {
  sendEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = gatherFormData();
    if (!data || !data.name || !data.email || data.project === 'Not specified') {
      alert('Please fill in your name, email and select a service before sending.');
      return;
    }
    const subject = `New Project Inquiry from ${data.name}`;
    const body = buildEmailBody(data);
    window.location.href = `mailto:arksassociates01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    contactForm.reset();
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
