// ZiZoe Plumbing — interactions

// Sticky header shadow
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form → WhatsApp handoff (no backend needed)
function zizoeSubmit(e) {
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value.trim());
  const phone = encodeURIComponent(f.phone.value.trim());
  const suburb = encodeURIComponent(f.suburb.value.trim() || '—');
  const msg = encodeURIComponent(f.message.value.trim());
  const text =
    `Hi ZiZoe Plumbing, I need help.%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Suburb: ${suburb}%0A%0A` +
    `${msg}`;
  window.open(`https://wa.me/27000000000?text=${text}`, '_blank', 'noopener');
  return false;
}
window.zizoeSubmit = zizoeSubmit;
