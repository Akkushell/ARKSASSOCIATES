const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your message has been recorded. We will contact you shortly.');
    contactForm.reset();
  });
}

const whatsappButtons = document.querySelectorAll('.whatsapp-button');
const whatsappPhone = '+918956527367'; // Replace with your WhatsApp number in international format without '+' sign

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
