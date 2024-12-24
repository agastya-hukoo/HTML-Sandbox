// Mobile nav toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scrolling (optional) & close mobile menu on link click
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('open');

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth',
    });
  });
});

// Reveal timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const teamMembers = document.querySelectorAll('.team-member');

function revealOnScroll() {
  // For timeline items
  timelineItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const offset = window.innerHeight * 0.85;
    if (rect.top < offset) {
      item.classList.add('in-view');
    }
  });

  // For team members
  teamMembers.forEach((member) => {
    const rect = member.getBoundingClientRect();
    const offset = window.innerHeight * 0.85;
    if (rect.top < offset) {
      member.classList.add('in-view');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
