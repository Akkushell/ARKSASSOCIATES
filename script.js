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
const whatsappPhone = '918956527367';

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
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const phone = contactForm.querySelector('input[name="phone"]').value || 'Not provided';
    const project = contactForm.querySelector('select[name="project_type"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    
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
