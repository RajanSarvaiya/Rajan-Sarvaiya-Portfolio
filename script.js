/* ===================================
   RAJAN SARVAIYA PORTFOLIO — SCRIPTS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     1. tsParticles — Star field hero bg
  ---------------------------------------- */
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: ['#c9a8ce', '#8b5cf6', '#ffffff'] },
        links: {
          color: '#c9a8ce',
          distance: 140,
          enable: true,
          opacity: 0.08,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: false,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, area: 900 },
          value: 80,
        },
        opacity: {
          value: { min: 0.15, max: 0.6 },
          animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
        },
        shape: { type: 'circle' },
        size: {
          value: { min: 1, max: 2.5 },
        },
      },
      detectRetina: true,
    });
  }

  /* ----------------------------------------
     2. Scroll Reveal (IntersectionObserver)
  ---------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger cards in a grid
          const parent = entry.target.closest('.projects-grid, .skills-grid, .skill-items');
          const siblings = parent
            ? [...parent.querySelectorAll('.reveal')]
            : [];
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ----------------------------------------
     3. Navbar scroll effect
  ---------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  // Scroll-down arrow: click to scroll to next section
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar compact on scroll
    if (scrollY > 60) {
      navbar.style.top = '12px';
    } else {
      navbar.style.top = '20px';
    }

    // Hide scroll-down arrow once user scrolls away from hero, show when back at top
    if (scrollIndicator) {
      if (scrollY > 80) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }

    // Scroll-to-top button
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active nav link highlighting
    updateActiveNavLink();
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------
     4. Active nav link on scroll
  ---------------------------------------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((a) => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = '#c9a8ce';
      }
    });
  }

  /* ----------------------------------------
     5. Mobile hamburger menu
  ---------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translateY(9px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ----------------------------------------
     6. Click-to-copy email
  ---------------------------------------- */
  const emailBox = document.getElementById('emailCopy');
  const emailText = document.getElementById('emailText').textContent.trim();

  emailBox.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      // Remove old message if any
      const old = emailBox.querySelector('.copied-msg');
      if (old) old.remove();

      const msg = document.createElement('span');
      msg.className = 'copied-msg';
      msg.textContent = '✓ Email copied!';
      emailBox.appendChild(msg);
      setTimeout(() => msg.remove(), 1600);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = emailText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  });

  /* ----------------------------------------
     7. Smooth scroll for anchor links
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----------------------------------------
     8. Project card tilt on mouse move (desktop)
  ---------------------------------------- */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ----------------------------------------
     9. Typing text in hero subtitle (optional polish)
  ---------------------------------------- */
  // Uncomment to enable typewriter effect on hero tag
  // const heroTag = document.querySelector('.hero-tag');
  // const tagText = 'FLUTTER DEVELOPER';
  // heroTag.textContent = '';
  // let i = 0;
  // const typeInterval = setInterval(() => {
  //   heroTag.textContent += tagText[i++];
  //   if (i >= tagText.length) clearInterval(typeInterval);
  // }, 80);

});
