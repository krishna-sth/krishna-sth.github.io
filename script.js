// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Section & Project Cards fade-in on scroll
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');

function handleScroll() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < trigger) section.classList.add('visible');
  });
  projectCards.forEach(card => {
    if (card.getBoundingClientRect().top < trigger) card.classList.add('visible');
  });
}
window.addEventListener('scroll', handleScroll);
handleScroll();

// Skills progress bar animation
const skills = document.querySelectorAll('.progress');
const skillSection = document.getElementById('skills');
function animateSkills() {
  if (skillSection.getBoundingClientRect().top < window.innerHeight * 0.85) {
    skills.forEach(skill => {
      skill.style.width = skill.getAttribute('data-width');
    });
  }
}
window.addEventListener('scroll', animateSkills);
animateSkills();

// Dark/light theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = toggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll for navbar links
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('active'); 
  });
});






// Contact form submission with fade & slide message
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

function showFormMessage(message, color) {
  formMessage.style.display = 'block';
  formMessage.style.color = color;
  formMessage.textContent = message;

  // Add show class for fade in
  formMessage.classList.remove('hide');
  formMessage.classList.add('show');

  // Fade out & slide up after 4 seconds
  setTimeout(() => {
    formMessage.classList.remove('show');
    formMessage.classList.add('hide');

    // Hide completely after transition
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 500); // matches CSS transition
  }, 4000);
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if(response.ok){
      showFormMessage("Message sent successfully!", '#00aaff');
      contactForm.reset();
    } else {
      response.json().then(data => {
        const errorMsg = data.errors ? data.errors.map(e => e.message).join(', ') : "❌ Message failed to send.";
        showFormMessage(errorMsg, 'red');
      });
    }
  }).catch(() => {
    showFormMessage("❌ Message failed to send.", 'red');
  });
});
