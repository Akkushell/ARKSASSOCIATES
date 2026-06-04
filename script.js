const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const whatsappPhone = '918956527367';

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
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
    if (siteNav.classList.contains('active')) {
      siteNav.classList.remove('active');
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');
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

const whatsappButtons = document.querySelectorAll('.whatsapp-button');
if (whatsappButtons.length) {
  whatsappButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const serviceName = button.getAttribute('data-service') || 'environmental service request';
      const message = `Hello ARK'S ASSOCIATES, I am interested in ${serviceName}. Please share details and next steps for my project.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  });
}

const contactForm = document.getElementById('whatsapp-contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const phone = contactForm.querySelector('input[name="phone"]').value.trim() || 'Not provided';
    const project = contactForm.querySelector('select[name="project_type"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    const text = `*New Project Inquiry - ARK'S ASSOCIATES*%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Email:* ${email}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*Service:* ${project}%0A` +
                 `*Details:* ${message}`;

    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
    contactForm.reset();
  });
}

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
});
