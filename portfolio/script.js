// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== Navbar shadow on scroll =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.background = '#ffffffee';
    nav.style.backdropFilter = 'blur(8px)';
  } else {
    nav.style.background = '#ffffff';
    nav.style.backdropFilter = 'none';
  }
});

// ===== Contact Form Handler =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please fill in all fields.';
    return;
  }

  formMsg.style.color = 'green';
  formMsg.textContent = `Thank you, ${name}! Your message has been sent.`;
  form.reset();
});

// ===== Simple fade-in animation on scroll =====
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'all 0.7s ease';
  observer.observe(sec);
});
