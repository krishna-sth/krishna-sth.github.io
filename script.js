// Smooth scroll
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});

// Fade-in sections & animate skills
const sections = document.querySelectorAll('section, header');
const skills = document.querySelectorAll('.progress');
const skillSection = document.getElementById('skills');

function handleScroll(){
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    if(section.getBoundingClientRect().top < triggerBottom) section.classList.add('visible');
  });

  if(skillSection.getBoundingClientRect().top < triggerBottom){
    skills.forEach(skill => skill.style.width = skill.getAttribute('style'));
  }

  const navbar = document.getElementById('navbar');
  if(window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}

window.addEventListener('scroll', handleScroll);

// Dark/Light mode toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
